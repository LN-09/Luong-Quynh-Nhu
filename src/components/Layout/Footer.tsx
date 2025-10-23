import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Code Challenge by Nhu
            </h3>
            <p className="text-sm text-gray-600">
              A collection of frontend coding challenges to test and improve my
              skills.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Solutions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Resources
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Connect
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/LN-09"
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all group"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/l%C6%B0%C6%A1ng-qu%E1%BB%B3nh-nh%C6%B0-182b65378/"
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all group"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://mail.google.com/mail/u/0/#inbox"
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all group"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600">
              © {currentYear} Code Challenge. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-600">
              <a href="#" className="hover:text-blue-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
