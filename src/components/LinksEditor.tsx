
"use client";

import { Link } from "@/generated/prisma/client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Reorder } from "framer-motion";
import { DragHandleIcon } from "./DragHandleIcon";
import { Switch } from "@/components/ui/switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export function LinksEditor({ links: initialLinks }: { links: Link[] }) {
  const [links, setLinks] = useState(initialLinks);
  const [newLink, setNewLink] = useState({ title: "", url: "" });
  const [errors, setErrors] = useState({ title: "", url: "" });

  const validateForm = () => {
    let valid = true;
    const newErrors = { title: "", url: "" };

    if (!newLink.title.trim()) {
      newErrors.title = "Title is mandatory.";
      valid = false;
    }

    if (!newLink.url.trim()) {
      newErrors.url = "URL is mandatory.";
      valid = false;
    } else if (!/^(https?:\/\/)?([\da-z\.-]+\.[a-z\.]{2,6}|[\d\.]+)([\/:?=&#]{1}[\da-z\.-]+)*[\/\?]?$/.test(newLink.url)) {
      newErrors.url = "Please enter a valid URL.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleCreateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const response = await fetch("/api/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newLink, position: links.length }),
    });
    const createdLink = await response.json();
    setLinks([...links, createdLink]);
    setNewLink({ title: "", url: "" });
    setErrors({ title: "", url: "" }); // Clear errors on successful submission
  };

  const handleReorder = async (newOrder: Link[]) => {
    setLinks(newOrder);
    const linksToUpdate = newOrder.map((link, index) => ({
      id: link.id,
      position: index,
    }));

    await fetch("/api/links", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(linksToUpdate),
    });
  };

  const handleToggleLink = async (link: Link) => {
    const updatedLink = { ...link, active: !link.active };
    setLinks(links.map((l) => (l.id === link.id ? updatedLink : l)));

    await fetch(`/api/links/${link.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ active: updatedLink.active }),
    });
  };

  const handleDeleteLink = async (id: string) => {
    await fetch(`/api/links/${id}`, {
      method: "DELETE",
    });
    setLinks(links.filter((link) => link.id !== id));
  };

  return (
    <div>
      <form onSubmit={handleCreateLink} className="mb-8">
        <div className="flex gap-4">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Title"
              value={newLink.title}
              onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
              className="bg-gray-800 text-white p-2 rounded-lg w-full"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>
          <div className="flex-grow">
            <input
              type="text"
              placeholder="URL"
              value={newLink.url}
              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
              className="bg-gray-800 text-white p-2 rounded-lg w-full"
            />
            {errors.url && <p className="text-red-500 text-sm mt-1">{errors.url}</p>}
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
          >
            Add Link
          </button>
        </div>
      </form>
      <p className="text-gray-400 mb-4 text-center">
        Drag and drop the links to reorder them.
      </p>
      <Reorder.Group values={links} onReorder={handleReorder}>
        {links.map((link) => (
          <Reorder.Item key={link.id} value={link}>
            <motion.div className="bg-gray-800 p-4 rounded-lg mb-4 flex items-center gap-4">
              <DragHandleIcon />
              <div className="flex-grow">
                <h2 className="text-xl font-bold">{link.title}</h2>
                <p className="text-gray-400">{link.url}</p>
              </div>
              <Switch
                checked={link.active}
                onCheckedChange={() => handleToggleLink(link)}
              />
              <button
                onClick={() => handleDeleteLink(link.id)}
                className="bg-transparent hover:text-red-700 text-red-600 p-2 rounded-lg"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </motion.div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}
