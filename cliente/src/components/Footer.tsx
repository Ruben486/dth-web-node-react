import { LuFacebook,LuInstagram,LuTwitter  } from "react-icons/lu";
import { memo, useMemo } from "react";
import { Button } from "./ui/button";

const Footer = memo(() => {
  console.log('el footer')
  return (
    <footer className="bg-white dark:bg-slate-600 border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Our Story</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Returns</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Cookie Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Seguinos</h3>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <LuFacebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                {useMemo(() => <LuInstagram className="h-5 w-5" />, [])}
              </Button>
              <Button variant="ghost" size="icon">
                <LuTwitter className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-gray-600">
          <p>&copy; 2025 Sinapsis Dev</p>
        </div>
      </div>
    </footer>
  );
});

export default Footer;