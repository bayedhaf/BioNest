'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit2, Trash2, GripVertical, Eye, X } from 'lucide-react';
import { LinkCard } from '@/components/bio/LinkCard';
import { toast } from 'sonner';

interface LinkItem {
  id: string;
  title: string;
  url: string;
  isActive: boolean;
  order: number;
}

export default function LinksPage() {
  const [links, setLinks] = useState<LinkItem[]>([
    { id: '1', title: 'My Portfolio', url: 'https://bayisa.dev', isActive: true, order: 1 },
    { id: '2', title: 'Instagram', url: 'https://instagram.com/bayisa', isActive: true, order: 2 },
    { id: '3', title: 'YouTube', url: 'https://youtube.com/@bayisa', isActive: false, order: 3 },
  ]);

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null);
  const [formData, setFormData] = useState({ title: '', url: '', isActive: true });

  const resetForm = () => {
    setFormData({ title: '', url: '', isActive: true });
    setEditingLink(null);
  };

  const openSheetForNew = () => {
    resetForm();
    setIsSheetOpen(true);
  };

  const openSheetForEdit = (link: LinkItem) => {
    setFormData({ 
      title: link.title, 
      url: link.url, 
      isActive: link.isActive 
    });
    setEditingLink(link);
    setIsSheetOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.url.trim()) {
      toast.error("Title and URL are required");
      return;
    }

    if (editingLink) {
      setLinks(links.map(link =>
        link.id === editingLink.id
          ? { ...link, title: formData.title.trim(), url: formData.url.trim(), isActive: formData.isActive }
          : link
      ));
      toast.success("Link updated successfully");
    } else {
      const newLink: LinkItem = {
        id: Date.now().toString(),
        title: formData.title.trim(),
        url: formData.url.trim(),
        isActive: formData.isActive,
        order: links.length + 1,
      };
      setLinks([...links, newLink]);
      toast.success("New link added successfully");
    }

    setIsSheetOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this link?")) return;
    setLinks(links.filter(link => link.id !== id));
    toast.success("Link deleted");
  };

  const toggleActive = (id: string) => {
    setLinks(links.map(link =>
      link.id === id ? { ...link, isActive: !link.isActive } : link
    ));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newLinks = [...links];
    [newLinks[index], newLinks[index - 1]] = [newLinks[index - 1], newLinks[index]];
    setLinks(newLinks.map((link, i) => ({ ...link, order: i + 1 })));
  };

  return (
    <div className="flex w-full h-full min-h-screen overflow-hidden bg-[#020617]">
      
      {/* LEFT SIDE: MAIN CONTENT (Resizes automatically) */}
      <div className="flex-1 transition-all duration-500 ease-in-out overflow-y-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white">My Links</h1>
              <p className="text-zinc-400 mt-2">Manage and organize your important links</p>
            </div>

            <Button onClick={openSheetForNew} className="gap-2 bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-5 h-5" />
              Add New Link
            </Button>
          </div>

          <div className="space-y-4">
            {links.length === 0 ? (
              <div className="bg-[#1e293b] border border-zinc-800 rounded-3xl p-16 text-center">
                <p className="text-zinc-400">No links added yet.</p>
              </div>
            ) : (
              links
                .sort((a, b) => a.order - b.order)
                .map((link, index) => (
                  <div 
                    key={link.id} 
                    className="flex gap-4 items-center bg-[#1e293b] border border-zinc-800 rounded-3xl p-6 group hover:border-emerald-500/50 transition-all"
                  >
                    <div className="text-zinc-500 cursor-grab">
                      <GripVertical className="w-6 h-6" />
                    </div>

                    <div className="flex-1">
                      <LinkCard 
                        title={link.title} 
                        url={link.url} 
                        isActive={link.isActive} 
                      />
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <Button variant="ghost" size="icon" onClick={() => toggleActive(link.id)}>
                        <Eye className={`w-5 h-5 ${link.isActive ? 'text-emerald-500' : 'text-zinc-500'}`} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openSheetForEdit(link)}>
                        <Edit2 className="w-5 h-5 text-zinc-300" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(link.id)} className="text-red-400 hover:text-red-500">
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: COLLAPSIBLE EDITOR PANEL */}
      <aside 
        className={`
          relative transition-all duration-500 ease-in-out border-l border-zinc-800 bg-[#0f172a]
          ${isSheetOpen ? 'w-[450px] opacity-100' : 'w-0 opacity-0 overflow-hidden border-none'}
        `}
      >
        <div className="w-[450px] p-8 text-white h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-semibold">
              {editingLink ? 'Edit Link' : 'Add New Link'}
            </h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSheetOpen(false)}
              className="hover:bg-zinc-800 rounded-full"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <Label htmlFor="title" className="text-zinc-400 text-sm uppercase tracking-wider">Link Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="My Portfolio"
                className="bg-zinc-950 border-zinc-800 py-6 focus:ring-emerald-500 text-lg"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="url" className="text-zinc-400 text-sm uppercase tracking-wider">URL</Label>
              <Input
                id="url"
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://bayisa.dev"
                className="bg-zinc-950 border-zinc-800 py-6 focus:ring-emerald-500 text-lg"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-xl border border-zinc-800">
              <Label htmlFor="active" className="text-zinc-300 cursor-pointer">Show on Bio Page</Label>
              <Switch
                id="active"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1 py-6 text-lg bg-emerald-600 hover:bg-emerald-700">
                {editingLink ? 'Save Changes' : 'Create Link'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsSheetOpen(false)}
                className="flex-1 py-6 text-black text-lg border-zinc-800 hover:bg-zinc-800"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </aside>
    </div>
  );
}