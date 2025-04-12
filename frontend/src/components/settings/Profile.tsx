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
import { Loader, Pencil } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { useMutation } from "@tanstack/react-query";
import { updateUserData } from "@/api/userApi";
import toast from "react-hot-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// zod
const profileSchema = z.object({
  fullName: z.string().optional(),
  phoneNumber: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      phoneNumber: user?.phoneNumber || "",
    },
  });

  const mutate = useMutation({
    mutationFn: (data: ProfileFormValues) => updateUserData(data),
    onSuccess: (data) => {
      setUser(data.user);
      toast.success(data.message);
      setIsEdit(false);
      reset({
        fullName: data.user.fullName,
        phoneNumber: data.user.phoneNumber,
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Update failed");
    },
  });

  const onSubmit = (values: ProfileFormValues) => {
    const updatedFields: ProfileFormValues = {};

    if (values.fullName !== user?.fullName) {
      updatedFields.fullName = values.fullName;
    }
    if (values.phoneNumber !== user?.phoneNumber) {
      updatedFields.phoneNumber = values.phoneNumber;
    }

    if (Object.keys(updatedFields).length === 0) {
      toast("No changes made.");
      return;
    }

    mutate.mutate(updatedFields);
  };

  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle className="text-2xl">Profile Information</CardTitle>
        <CardDescription className="text-gray-500">
          Update your personal details
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Profile Picture */}
        <ProfilePictureUploader />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div className="space-y-2">
            <Label>Full Name</Label>
            {isEdit ? (
              <div className="relative">
                <Pencil className="absolute size-4 top-1/2 -translate-y-1/2 right-2" />
                <Input
                  type="text"
                  placeholder="Write your name"
                  {...register("fullName")}
                />
              </div>
            ) : (
              <p className="border border-black/20 px-2 py-2 rounded-sm">
                {user?.fullName}
              </p>
            )}
          </div>

          {/* Email (read-only) */}
          <div className="space-y-2">
            <Label>Email</Label>
            <p className="border border-black/20 px-2 py-2 rounded-sm">
              {user?.email}
            </p>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label>Phone Number</Label>
            {isEdit ? (
              <div className="relative">
                <Pencil className="absolute size-4 top-1/2 -translate-y-1/2 right-2" />
                <Input
                  type="tel"
                  placeholder="Phone number"
                  {...register("phoneNumber")}
                />
              </div>
            ) : (
              <p className="border border-black/20 px-2 py-2 rounded-sm">
                {user?.phoneNumber || "Not saved"}
              </p>
            )}
          </div>

          {/* Save Button */}
          {isEdit && (
            <Button
              type="submit"
              className="w-[180px] cursor-pointer"
              disabled={!isDirty || mutate.isPending}
            >
              {mutate.isPending ? <Loader size={4} className="animate-spin"/> : "Save Changes"}
            </Button>
          )}
        </form>

        {/* Edit Button */}
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
