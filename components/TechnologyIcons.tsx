import React from 'react';

// Real brand logos via simpleicons.org CDN.
// Each icon uses the official simple-icons slug + the brand's primary color.
// onError hides the image so the layout doesn't break if the CDN fails.

const TechIcon: React.FC<{ slug: string; color: string; name: string }> = ({ slug, color, name }) => (
    <img
        src={`https://cdn.simpleicons.org/${slug}/${color}`}
        alt={name}
        title={name}
        className="w-7 h-7 object-contain"
        loading="lazy"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
    />
);

export const ReactIcon: React.FC = () => <TechIcon slug="react" color="61DAFB" name="React" />;
export const VueIcon: React.FC = () => <TechIcon slug="vuedotjs" color="4FC08D" name="Vue.js" />;
export const AngularIcon: React.FC = () => <TechIcon slug="angular" color="DD0031" name="Angular" />;
export const NodeIcon: React.FC = () => <TechIcon slug="nodedotjs" color="5FA04E" name="Node.js" />;
export const LaravelIcon: React.FC = () => <TechIcon slug="laravel" color="FF2D20" name="Laravel" />;
export const PHPIcon: React.FC = () => <TechIcon slug="php" color="777BB4" name="PHP" />;
export const PythonIcon: React.FC = () => <TechIcon slug="python" color="3776AB" name="Python" />;
export const WordPressIcon: React.FC = () => <TechIcon slug="wordpress" color="21759B" name="WordPress" />;
export const MagentoIcon: React.FC = () => <TechIcon slug="magento" color="EE672F" name="Magento" />;
export const ShopifyIcon: React.FC = () => <TechIcon slug="shopify" color="7AB55C" name="Shopify" />;
export const WooCommerceIcon: React.FC = () => <TechIcon slug="woocommerce" color="96588A" name="WooCommerce" />;
export const ReactNativeIcon: React.FC = () => <TechIcon slug="react" color="61DAFB" name="React Native" />;
export const FlutterIcon: React.FC = () => <TechIcon slug="flutter" color="02569B" name="Flutter" />;
export const SwiftIcon: React.FC = () => <TechIcon slug="swift" color="F05138" name="Swift" />;
export const AWSIcon: React.FC = () => <TechIcon slug="amazonwebservices" color="232F3E" name="AWS" />;
export const DockerIcon: React.FC = () => <TechIcon slug="docker" color="2496ED" name="Docker" />;
export const SalesforceIcon: React.FC = () => <TechIcon slug="salesforce" color="00A1E0" name="Salesforce" />;
export const HubSpotIcon: React.FC = () => <TechIcon slug="hubspot" color="FF7A59" name="HubSpot" />;
export const ZohoIcon: React.FC = () => <TechIcon slug="zoho" color="C8202F" name="Zoho" />;
