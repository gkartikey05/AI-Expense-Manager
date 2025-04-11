import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import ProfilePictureUploader from "../ProfilePictureUploader";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";

const Profile = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle className="text-2xl">Profile Information</CardTitle>
        <CardDescription className="text-gray-500">
          Update your personal details
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* picture */}
        <ProfilePictureUploader />

        {/* user details */}
        <form className="space-y-5">
          {/* full name */}
          <div className="space-y-2">
            <Label>Full Name</Label>
            {isEdit ? (
              <Input type="text" />
            ) : (
              <p className="border border-black/20 px-2 py-2 rounded-sm">
                Sandeep Singh Nayal
              </p>
            )}
          </div>

          {/* email */}
          <div className="space-y-2">
            <Label>Email</Label>
            <p className="border border-black/20 px-2 py-2 rounded-sm">
              sandeep@example.com
            </p>
          </div>

          {/* mobile number */}
          <div className="space-y-2">
            <Label>Phone Number</Label>
            {isEdit ? (
              <Input type="tel" />
            ) : (
              <p className="border border-black/20 px-2 py-2 rounded-sm">
                Null
              </p>
            )}
          </div>

          {/* Save Changes button */}
          {isEdit && (
            <Button type="submit" className="w-[180px] cursor-pointer">
              Save Changes
            </Button>
          )}
        </form>

        {/* Edit button*/}
        {!isEdit && (
          <Button
            type="button"
            onClick={() => setIsEdit(true)}
            className="mt-4 w-[180px] cursor-pointer"
          >
            Edit <Pencil className="size-4 ml-1" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default Profile;
