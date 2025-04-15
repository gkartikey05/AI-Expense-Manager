
import { Button } from "@/components/ui/button"; 

const HelpSupportSection = () => {
  return (
    <div className="bg-white rounded-md shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-2">Help & Support</h2>
      <p className="text-sm text-gray-500 mb-4">
        Get help with your account and find resources
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-md p-4">
          <h3 className="font-semibold mb-1">FAQs</h3>
          <p className="text-sm text-gray-600 mb-2">
            Find answers to common questions about using our platform.
          </p>
          <Button variant="outline" size="sm">
            View FAQs
          </Button>
        </div>

        <div className="border rounded-md p-4">
          <h3 className="font-semibold mb-1">Contact Support</h3>
          <p className="text-sm text-gray-600 mb-2">
            Need more help? Get in touch with our support team.
          </p>
          <Button variant="outline" size="sm">
            Contact Support
          </Button>
        </div>

        <div className="border rounded-md p-4">
          <h3 className="font-semibold mb-1">Video Tutorials</h3>
          <p className="text-sm text-gray-600 mb-2">
            Learn how to use our platform with video guides.
          </p>
          <Button variant="outline" size="sm">
            Watch Tutorials
          </Button>
        </div>

        <div className="border rounded-md p-4">
          <h3 className="font-semibold mb-1">Feedback</h3>
          <p className="text-sm text-gray-600 mb-2">
            Share your thoughts and suggestions with us.
          </p>
          <Button variant="outline" size="sm">
            Send Feedback
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportSection;
