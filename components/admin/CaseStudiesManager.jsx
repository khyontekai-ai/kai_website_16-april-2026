import { useState } from 'react'
import { FileText, Edit, Trash2, Plus, RefreshCw, Link as LinkIcon } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function CaseStudiesManager({ casestudies, onSave, onDelete, actionLoading }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [editingCaseStudy, setEditingCaseStudy] = useState(null)
  
  const [form, setForm] = useState({
    title: '',
    description: '',
    link: ''
  })

  const openAdd = () => {
    setForm({ title: '', description: '', link: '' })
    setEditingCaseStudy(null)
    setModalOpen(true)
  }

  const openEdit = (cs) => {
    setForm({
      title: cs.title || '',
      description: cs.description || '',
      link: cs.link || ''
    })
    setEditingCaseStudy(cs)
    setModalOpen(true)
  }

  const openDelete = (cs) => {
    setEditingCaseStudy(cs)
    setDeleteModalOpen(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    await onSave(form, editingCaseStudy)
    setModalOpen(false)
  }

  const handleDelete = async () => {
    await onDelete('casestudy', editingCaseStudy.id || editingCaseStudy._id)
    setDeleteModalOpen(false)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-light-grey/50">
        <h3 className="text-base font-bold text-dark-navy uppercase tracking-tight font-nunito flex items-center gap-2">
          <FileText size={18} className="text-royal-blue" /> Case Studies (Homepage)
        </h3>
        <Button onClick={openAdd} className="bg-royal-blue hover:bg-dark-navy text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm">
          <Plus size={14} className="mr-2" /> Add Case Study
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-light-grey">
            <TableRow>
              <TableHead className="text-[10px] uppercase font-extrabold tracking-wider text-dark-navy font-fira-code py-3 w-1/4">Title</TableHead>
              <TableHead className="text-[10px] uppercase font-extrabold tracking-wider text-dark-navy font-fira-code py-3 w-1/2">Description</TableHead>
              <TableHead className="text-[10px] uppercase font-extrabold tracking-wider text-dark-navy font-fira-code py-3">Link</TableHead>
              <TableHead className="text-right text-[10px] uppercase font-extrabold tracking-wider text-dark-navy font-fira-code py-3">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {casestudies && casestudies.length > 0 ? (
              casestudies.map((cs) => (
                <TableRow key={cs.id || cs._id} className="hover:bg-pale-blue/10">
                  <TableCell>
                    <div className="text-sm font-bold text-dark-navy font-nunito">{cs.title}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs text-mid-grey line-clamp-2 mt-0.5 font-light">{cs.description}</div>
                  </TableCell>
                  <TableCell>
                    {cs.link ? (
                      <a href={cs.link} target="_blank" rel="noreferrer" className="text-xs text-royal-blue hover:underline flex items-center gap-1 font-fira-code truncate max-w-[150px]">
                        <LinkIcon size={12} /> {cs.link}
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400 italic">No link</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right text-xs font-semibold space-x-1 whitespace-nowrap">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(cs)} className="text-royal-blue hover:bg-pale-blue/30 rounded-lg" title="Edit">
                      <Edit size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => openDelete(cs)} className="text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg" title="Delete">
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12 text-mid-grey text-sm">
                  No case studies exist. Click 'Add Case Study' to populate the homepage.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Save Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-xl font-nunito">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-dark-navy uppercase tracking-tight">
              {editingCaseStudy ? 'Modify Case Study' : 'Create Case Study'}
            </DialogTitle>
            <DialogDescription className="text-xs font-fira-code text-mid-grey">
              // Appears in the 'What We Work On' section on Homepage
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4 mt-4">
            <div>
              <label className="block text-[10px] uppercase font-bold text-dark-navy tracking-wide mb-1 font-fira-code">Case Study Title</label>
              <Input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="e.g. Biological Intelligence" className="focus-visible:ring-royal-blue" />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-dark-navy tracking-wide mb-1 font-fira-code">Description</label>
              <Textarea required rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Short summary..." className="focus-visible:ring-royal-blue resize-none" />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-dark-navy tracking-wide mb-1 font-fira-code">Target Link URL (Optional)</label>
              <Input value={form.link} onChange={e => setForm({...form, link: e.target.value})} placeholder="e.g. /research#bio or https://..." className="focus-visible:ring-royal-blue" />
            </div>
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="rounded-lg font-bold text-xs uppercase tracking-wider">Cancel</Button>
              <Button type="submit" disabled={actionLoading} className="bg-royal-blue hover:bg-dark-navy text-white rounded-lg font-bold text-xs uppercase tracking-wider">
                {actionLoading && <RefreshCw size={14} className="animate-spin mr-2" />}
                Save Content
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="sm:max-w-md font-nunito">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-red-600 uppercase tracking-tight">Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the case study <strong>"{editingCaseStudy?.title}"</strong>? It will immediately disappear from the homepage.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-4">
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)} className="rounded-lg font-bold text-xs uppercase tracking-wider">Cancel</Button>
            <Button variant="destructive" disabled={actionLoading} onClick={handleDelete} className="rounded-lg font-bold text-xs uppercase tracking-wider">
              {actionLoading && <RefreshCw size={14} className="animate-spin mr-2" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
