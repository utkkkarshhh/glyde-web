import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { YEAR_IN_SCHOOL } from "@/constants/constants";

export default function EditProfileModal({ isOpen, onClose, currentUser, onUpdate }) {
  const [formData, setFormData] = useState({});
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        first_name: currentUser.first_name || "",
        last_name: currentUser.last_name || "",
        bio: currentUser.bio || "",
        major: currentUser.major || "",
        year_in_school: currentUser.year_in_school || "",
        phone_number: currentUser.phone_number || "",
        profile_pic: null,
      });
      setPreviewImage(currentUser.profile_pic || null);
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profile_pic: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    }
    onUpdate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
              {previewImage && <img src={previewImage} alt="Profile Preview" className="w-full h-full object-cover" />}
            </div>
            <Input type="file" onChange={handleFileChange} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleInputChange} />
            <Input name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleInputChange} />
          </div>
          <Textarea name="bio" placeholder="Bio" value={formData.bio} onChange={handleInputChange} />
          <Input name="major" placeholder="Major" value={formData.major} onChange={handleInputChange} />
          <Input name="phone_number" placeholder="Phone Number" value={formData.phone_number} onChange={handleInputChange} />
          <Select onValueChange={(value) => setFormData({ ...formData, year_in_school: value })} value={formData.year_in_school}>
            <SelectTrigger>
              <SelectValue placeholder="Year in School" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(YEAR_IN_SCHOOL).map(([key, value]) => (
                <SelectItem key={key} value={value}>{value}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
