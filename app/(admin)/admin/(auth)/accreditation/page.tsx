"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AccreditaionList from "./accreditation-list";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ImageUploader } from "@/components/ui/image-uploader";
import { generateDimentions } from "@/lib/generateDimentions";

export default function AccreditationPage() {
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [bannerAlt, setBannerAlt] = useState("");

  const handleMetaSave = async () => {
    try {
      const response = await fetch('/api/admin/accreditation/meta', {
        method: "PATCH",
        body: JSON.stringify({
          metaTitle,
          metaDescription
        })
      })
      if (response.ok) {
        const data = await response.json()
        alert(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMeta = async () => {
    try {
      const response = await fetch('/api/admin/accreditation/meta')
      if (response.ok) {
        const data = await response.json()
        if (data) {
          setMetaTitle(data.data.metaTitle)
          setMetaDescription(data.data.metaDescription)
        }
      }
    } catch (error) {
      console.log("Failed to fetch data:", error)
    }
  }

  const handleBannerSave = async () => {
    try {
      const response = await fetch('/api/admin/accreditation/banner', {
        method: "PATCH",
        body: JSON.stringify({
          bannerImage,
          bannerAlt,
          pageName:"accreditation"
        })
      })
      if (response.ok) {
        const data = await response.json()
        alert(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchBanner = async () => {
    try {
      const response = await fetch('/api/admin/accreditation/banner')
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        if (data) {
          setBannerImage(data.data[0].image)
          setBannerAlt(data.data[0].alt)
        }
      }
    } catch (error) {
      console.log("Failed to fetch data:", error)
    }
  }

  useEffect(() => {
    fetchMeta()
    fetchBanner()
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <div className='border-dashed border-2 p-4 flex flex-col gap-5'>
        <div className='flex justify-between'>
          <div>Meta Section</div>
          <Button onClick={handleMetaSave}>Save</Button>
        </div>
        <div>
          <Label>Meta Title</Label>
          <Input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
        </div>
        <div>
          <Label>Meta Description</Label>
          <Input value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} />
        </div>
      </div>

      <div className='border-dashed border-2 p-4 flex flex-col gap-5'>
        <div className='flex justify-between mb-5'>
          <h2 className='font-bold'>Banner Image</h2>
          <Button onClick={handleBannerSave}>Save Banner</Button>
        </div>
        <ImageUploader value={bannerImage} onChange={(url) => setBannerImage(url)} />
        <p className='text-xs text-gray-500'>{generateDimentions("accreditation", "banner")}</p>
        <Label>Banner Alt</Label>
        <Input value={bannerAlt} onChange={(e) => setBannerAlt(e.target.value)} />
      </div>
      <AccreditaionList />
      {/* <AccreditationForm /> */}
    </div>
  );
}
