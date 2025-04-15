import DashboardHeader from "@/components/DashboardHeader";
import HelpAndSupport from "@/components/settings/Help&Support";
import Preferences from "@/components/settings/Preferences";
import Profile from "@/components/settings/Profile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle, Settings, User } from "lucide-react";

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
          <TabsList className="flex gap-2  rounded-sm">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:text-black px-4 py-2 rounded-md text-gray-600"
            >
              <User /> <p className="hidden sm:block">Profile</p>
            </TabsTrigger>
            <TabsTrigger
              value="preference"
              className="data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:text-black px-4 py-2 rounded-md text-gray-600"
            >
              <Settings /> <p className="hidden sm:block">Preference</p>
            </TabsTrigger>
            <TabsTrigger
              value="help & support"
              className="data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:text-black px-4 py-2 rounded-md text-gray-600"
            >
              <HelpCircle />{" "}
              <span className="hidden sm:block">Help & Support</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Profile />
          </TabsContent>
          <TabsContent value="preference">
            <Preferences />
          </TabsContent>
          <TabsContent value="help & support">
            <HelpAndSupport />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
};

export default SettingPage;
