import DashboardHeader from "@/components/DashboardHeader";
import Profile from "@/components/settings/Profile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle, User } from "lucide-react";

const SettingPage = () => {
  return (
    <>
      <DashboardHeader title="Settings" />

      <section className="px-4 md:px-6 lg:px-10 py-5 space-y-5">
        <h1 className="text-2xl">Settings</h1>
        <p className="text-gray-500">
          Manage your account preference and settings
        </p>

        {/* tabs */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="flex gap-2 rounded-sm">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:text-black px-4 py-2 rounded-md text-gray-600"
            >
              <User /> Profile
            </TabsTrigger>
            <TabsTrigger
              value="help & support"
              className="data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:text-black px-4 py-2 rounded-md text-gray-600"
            >
              <HelpCircle /> Help & Support
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Profile />
          </TabsContent>
          <TabsContent value="help & support">
            Lorem ipsum dolor sit amet.
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
};

export default SettingPage;
