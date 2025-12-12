<?php
// Set headers to allow requests from your website and define the response as JSON
header("Access-Control-Allow-Origin: *"); // For production, you might want to restrict this to your domain
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

// --- IMPORTANT: SECURITY ---
// Get the API key from a server environment variable.
// This is crucial for security. DO NOT hard-code your key here.
$apiKey = getenv('API_KEY');

if (!$apiKey) {
    http_response_code(500);
    echo json_encode(["error" => "API_KEY environment variable not set on the server."]);
    exit;
}

// Ensure the request is a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method Not Allowed"]);
    exit;
}

// Read the incoming JSON data from the chatbot frontend
$input = json_decode(file_get_contents("php://input"), true);

if (json_last_error() !== JSON_ERROR_NONE || !isset($input['message']) || !isset($input['history'])) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid JSON input. 'message' and 'history' are required."]);
    exit;
}

// --- Prepare the data for the Google Gemini API ---
$userMessage = $input['message'];
$history = $input['history'];

// Format the conversation history and the new message
$contents = [];
foreach ($history as $message) {
    if (in_array($message['role'], ['user', 'model'])) {
        $contents[] = [
            'role' => $message['role'],
            'parts' => [['text' => $message['text']]]
        ];
    }
}
// Add the latest user message
$contents[] = [
    'role' => 'user',
    'parts' => [['text' => $userMessage]]
];

// This is the same system prompt from your chatbot component
$system_prompt = "You are Aria, a friendly and professional AI assistant for Stallioni, a top IT outsourcing company in India. Your goal is to help users find information, understand our services, and guide them to the right resources. Key Information about Stallioni: - What we do: We provide offshore software development services. Clients hire dedicated Indian developers from us to build remote teams. - Services: Web Development (WordPress, Shopify, React, PHP), E-commerce, Mobile App Development (iOS, Android, React Native, Flutter), AI & ML solutions, CRM Customization (Salesforce, HubSpot, Zoho), UI/UX Design, and Digital Marketing/SEO. - Audience: Global clients, especially from the US, UK, Europe, and Australia. Your Persona & Rules: 1. Be helpful and concise. 2. Guide users to the contact page or a human for final decisions. 3. Use Markdown (lists, bold text). 4. Use Call-to-Actions (CTAs) on new lines, like `[Explore our services]`, `[View our portfolio]`, `[Chat on WhatsApp]`, or `[Connect on MS Teams]`.";

$payload = [
    'contents' => $contents,
    'systemInstruction' => [
        'parts' => [['text' => $system_prompt]]
    ]
];

// --- Make the API call to Google using cURL ---
$url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' . $apiKey;

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true); // Recommended for production

$response = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curl_error = curl_error($ch);
curl_close($ch);

// --- Handle the response ---
if ($curl_error || $httpcode >= 400) {
    http_response_code($httpcode > 0 ? $httpcode : 500);
    echo json_encode([
        "error" => "Failed to communicate with the Gemini API.",
        "details" => $curl_error ?: json_decode($response)
    ]);
    exit;
}

$responseData = json_decode($response, true);
$text = $responseData['candidates'][0]['content']['parts'][0]['text'] ?? "I'm sorry, I couldn't generate a response at this moment.";

// Send the final text response back to the chatbot frontend
echo json_encode(["text" => $text]);