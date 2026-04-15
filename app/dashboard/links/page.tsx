'use client';

import { useState, useEffect } from 'react';
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
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null);
  const [formData, setFormData] = useState({ title: '', url: '', isActive: true });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const res = await fetch('/api/links');
      if (!res.ok) throw new Error('Failed to fetch links');
      const data = await res.json();
      setLinks(data.data);
    } catch (error) {
      toast.error('Could not load links');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.url.trim()) {
      toast.error("Title and URL are required");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingLink) {
        const res = await fetch(`/api/links/${editingLink.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('Failed to update');
        const { data } = await res.json();
        
        setLinks(links.map(link => (link.id === editingLink.id ? data : link)));
        toast.success("Link updated successfully");
      } else {
        const payload = {
          ...formData,
          order: links.length,
        };
        const res = await fetch('/api/links', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Failed to create');
        const { data } = await res.json();

        setLinks([...links, data]);
        toast.success("New link added successfully");
      }
      setIsSheetOpen(false);
      resetForm();
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this link?")) return;
    
    try {
      const res = await fetch(`/api/links/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      
      setLinks(links.filter(link => link.id !== id));
      toast.success("Link deleted");
    } catch (error) {
      toast.error("Could not delete link");
    }
  };

  const toggleActive = async (link: LinkItem) => {
    const newStatus = !link.isActive;
    
    // Optimistic UI update
    setLinks(links.map(l => l.id === link.id ? { ...l, isActive: newStatus } : l));
    
    try {
      const res = await fetch(`/api/links/${link.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...link, isActive: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to toggle');
    } catch (error) {
      toast.error("Failed to update status");
      // Revert optimistic update
      setLinks(links.map(l => l.id === link.id ? { ...l, isActive: link.isActive } : l));
    }
  };

  const moveUp = async (index: number) => {
    if (index === 0) return;
    
    const newLinks = [...links];
    // Swap elements
    [newLinks[index], newLinks[index - 1]] = [newLinks[index - 1], newLinks[index]];
    
    // Update orders mathematically
    const updatedLinksList = newLinks.map((link, i) => ({ ...link, order: i }));
    setLinks(updatedLinksList);

    // Persist changes to server
    try {
      const payload = {
        links: updatedLinksList.map(l => ({ id: l.id, order: l.order }))
      };
      
      const res = await fetch('/api/links/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) throw new Error('Failed to reorder');
      toast.success("Order updated");
    } catch (error) {
      toast.error("Failed to save new order");
      // Could re-fetch to revert the UI here if we wanted
    }
  };

  return (
    <div className="flex w-full h-full min-h-screen overflow-hidden bg-[#020617]">
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
            {loading ? (
              <div className="text-zinc-400 text-center py-10">Loading links...</div>
            ) : links.length === 0 ? (
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
                    <div 
                      className="text-zinc-500 cursor-pointer hover:text-emerald-500"
                      onClick={() => moveUp(index)}
                      title="Move Up"
                    >
                      <GripVertical className="w-6 h-6" />
                    </div>

                    <div className="flex-1">
                      <LinkCard 
                        title={link.title} 
                        url={link.url} 
                        isActive={link.isActive} 
                      />
                    </div>

                    <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all">
                      <Button variant="ghost" size="icon" onClick={() => toggleActive(link)}>
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

      <aside 
        className={`relative transition-all duration-500 ease-in-out border-l border-zinc-800 bg-[#0f172a] ${isSheetOpen ? 'w-[450px] opacity-100' : 'w-0 opacity-0 overflow-hidden border-none'}`}
      >
        <div className="w-[450px] p-8 text-white h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-semibold">
              {editingLink ? 'Edit Link' : 'Add New Link'}
            </h2>
            <Button variant="ghost" size="icon" onClick={() => setIsSheetOpen(false)} className="hover:bg-zinc-800 rounded-full">
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
                placeholder="https://"
                className="bg-zinc-950 border-zinc-800 py-6 focus:ring-emerald-500 text-lg"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
              <div>
                <Label className="text-base text-zinc-200">Active Status</Label>
                <p className="text-sm text-zinc-500 mt-1">Hide this link from your profile</p>
              </div>
              <Switch 
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 hover:bg-emerald-700 py-6 text-lg font-semibold rounded-2xl">
              {isSubmitting ? "Saving..." : (editingLink ? 'Save Changes' : 'Create Link')}
            </Button>
          </form>
        </div>
      </aside>
    </div>
  );
}
