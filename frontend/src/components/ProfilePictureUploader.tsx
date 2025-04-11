import { useState } from "react";
import { User } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProfilePictureUploader() {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Image Preview or Placeholder */}
      <Label htmlFor="profile-image" className="cursor-pointer">
        {image ? (
          <img
            src={image}
            alt="Profile Preview"
            className="w-24 h-24 rounded-full object-cover border "
          />
        ) : (
          <div className="w-24 h-24 rounded-full flex items-center justify-center border bg-gray-100">
            <User className="w-10 h-10" />
          </div>
        )}
      </Label>

      {/* Hidden Input */}
      <Input
        id="profile-image"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      <Button asChild>
        <Label htmlFor="profile-image" className="cursor-pointer">
          Change Picture
        </Label>
      </Button>
    </div>
  );
}
