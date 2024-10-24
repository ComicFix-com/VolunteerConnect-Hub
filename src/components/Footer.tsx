import { Facebook, Instagram, Linkedin, Twitter, Youtube, Github } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/comicfix", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com/comicfix", label: "Twitter" },
    { icon: Discord, href: "https://discord.gg/comicfix", label: "Discord" },
    { icon: Linkedin, href: "https://linkedin.com/company/comicfix", label: "LinkedIn" },
    { icon: Youtube, href: "https://youtube.com/@comicfix", label: "YouTube" },
  ];

  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-lg sm:text-xl font-semibold text-primary">
            VolunteerConnect Hub
          </div>
          <p className="text-sm text-gray-600 text-center">
            An open source project by the ComicFix community
          </p>
          <div className="flex items-center space-x-4 sm:space-x-6">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary transition-colors"
                aria-label={label}
              >
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
            ))}
          </div>
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} VolunteerConnect Hub. Open source under MIT License.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;