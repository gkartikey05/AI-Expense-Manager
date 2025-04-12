import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useUserStore } from "@/store/userStore";
import { Loader, User } from "lucide-react";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { updateUserData } from "@/api/userApi";
import toast from "react-hot-toast";

type FormData = {
  profile?: File;
};

const ProfilePictureUploader = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setImagePreview(imageUrl);
      setFile(selectedFile);
    }
  };

  const mutation = useMutation({
    mutationFn: (data: FormData) => updateUserData(data),
    onSuccess: (data: any) => {
      setUser(data.user);
      toast.success(data.message);
      setFile(null);
      setImagePreview(null);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Upload failed");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData= new FormData();
    formData.append("profile", file);
    mutation.mutate(formData);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4"
      >
        <Label
          htmlFor="profile-image"
          className="size-24 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer"
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Image preview"
              className="size-full object-cover rounded-full opacity-70"
            />
          ) : user?.profile ? (
            <img
              src={user.profile}
              alt="User profile"
              className="size-full object-cover rounded-full"
            />
          ) : (
            <User className="size-14 text-gray-500" />
          )}
        </Label>

        <Input
          id="profile-image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        {file && (
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="cursor-pointer"
          >
            {mutation.isPending ? (
              <Loader className="size-4 animate-spin" />
            ) : (
              "Save"
            )}
          </Button>
        )}
      </form>

      {!file && (
        <Button type="button" asChild>
          <Label htmlFor="profile-image" className="cursor-pointer">
            Choose Picture
          </Label>
        </Button>
      )}
    </div>
  );
};

export default ProfilePictureUploader;
