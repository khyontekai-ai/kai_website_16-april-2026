import { useState } from 'react'
import { Rocket, Clock, CheckCircle2, CircleDot, Edit, Trash2, Plus, RefreshCw } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const STATUS_OPTIONS = ['In Progress', 'Planning', 'Concept', 'Completed']

const statusConfig = {
  'In Progress': { color: 'bg-royal-blue text-white border-transparent', icon: CircleDot },
  'Planning': { color: 'bg-amber-gold text-dark-navy border-transparent', icon: Clock },
  'Concept': { color: 'bg-pale-blue text-royal-blue border-royal-blue/20', icon: Rocket },
  'Completed': { color: 'bg-green-100 text-green-700 border-transparent', icon: CheckCircle2 },
}

export default function ProjectsManager({ projects, onSave, onDelete, actionLoading }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  
  const [form, setForm] = useState({
    title: '',
    status: 'Planning',
    timeline: '',
    description: '',
    details: ''
  })

  const openAdd = () => {
    setForm({ title: '', status: 'Planning', timeline: '', description: '', details: '' })
    setEditingProject(null)
    setModalOpen(true)
  }

  const openEdit = (proj) => {
    setForm({
      title: proj.title || '',
      status: proj.status || 'Planning',
      timeline: proj.timeline || '',
      description: proj.description || '',
      details: proj.details || ''
    })
    setEditingProject(proj)
    setModalOpen(true)
  }

  const openDelete = (proj) => {
    setEditingProject(proj)
    setDeleteModalOpen(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    await onSave(form, editingProject)
    setModalOpen(false)
  }

  const handleDelete = async () => {
    await onDelete('project', editingProject.id || editingProject._id)
    setDeleteModalOpen(false)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-light-grey/50">
        <h3 className="text-base font-bold text-dark-navy uppercase tracking-tight font-nunito">
          Project Initiatives Index
        </h3>
        <Button onClick={openAdd} className="bg-royal-blue hover:bg-dark-navy text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm">
          <Plus size={14} className="mr-2" /> Add Project
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-light-grey">
            <TableRow>
              <TableHead className="text-[10px] uppercase font-extrabold tracking-wider text-dark-navy font-fira-code py-3">Status</TableHead>
              <TableHead className="text-[10px] uppercase font-extrabold tracking-wider text-dark-navy font-fira-code">Title</TableHead>
              <TableHead className="text-[10px] uppercase font-extrabold tracking-wider text-dark-navy font-fira-code">Timeline</TableHead>
              <TableHead className="text-right text-[10px] uppercase font-extrabold tracking-wider text-dark-navy font-fira-code">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length > 0 ? (
              projects.map((proj) => {
                const { color, icon: StatusIcon } = statusConfig[proj.status] || statusConfig['Concept']
                return (
                  <TableRow key={proj.id || proj._id} className="hover:bg-pale-blue/10">
                    <TableCell>
                      <span className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-black px-2.5 py-1 rounded-md border ${color}`}>
                        <StatusIcon size={12} />
                        {proj.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-bold text-dark-navy font-nunito">{proj.title}</div>
                      <div className="text-xs text-mid-grey line-clamp-1 mt-0.5 font-light">{proj.description}</div>
                    </TableCell>
                    <TableCell className="text-xs font-medium text-dark-grey">
                      {proj.timeline}
                    </TableCell>
                    <TableCell className="text-right text-xs font-semibold space-x-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(proj)} className="text-royal-blue hover:bg-pale-blue/30 rounded-lg" title="Edit">
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openDelete(proj)} className="text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg" title="Delete">
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12 text-mid-grey text-sm">
                  No projects exist in the database collections. Click 'Add Project' to populate.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Save Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-2xl font-nunito">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-dark-navy uppercase tracking-tight">
              {editingProject ? 'Modify Project Configuration' : 'Index New Project'}
            </DialogTitle>
            <DialogDescription className="text-xs font-fira-code text-mid-grey">
              // Database fields editor
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-[10px] uppercase font-bold text-dark-navy tracking-wide mb-1 font-fira-code">Project Title</label>
                <Input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="e.g. Assamese NLP Foundation Suite" className="focus-visible:ring-royal-blue" />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-dark-navy tracking-wide mb-1 font-fira-code">Project Status</label>
                <Select value={form.status} onValueChange={val => setForm({...form, status: val})}>
                  <SelectTrigger className="focus:ring-royal-blue font-semibold text-dark-navy">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-dark-navy tracking-wide mb-1 font-fira-code">Timeline / Delivery</label>
                <Input required value={form.timeline} onChange={e => setForm({...form, timeline: e.target.value})} placeholder="e.g. Q3 2026" className="focus-visible:ring-royal-blue" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-dark-navy tracking-wide mb-1 font-fira-code">Brief Description (Home/List summary)</label>
              <Textarea required rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Summarise the core scientific approach..." className="focus-visible:ring-royal-blue resize-none" />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-dark-navy tracking-wide mb-1 font-fira-code">Scientific & Technical Details (Expanded view)</label>
              <Textarea required rows={4} value={form.details} onChange={e => setForm({...form, details: e.target.value})} placeholder="Detail the technical pipeline parameters..." className="focus-visible:ring-royal-blue resize-none font-light" />
            </div>
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="rounded-lg font-bold text-xs uppercase tracking-wider">Cancel</Button>
              <Button type="submit" disabled={actionLoading} className="bg-royal-blue hover:bg-dark-navy text-white rounded-lg font-bold text-xs uppercase tracking-wider">
                {actionLoading && <RefreshCw size={14} className="animate-spin mr-2" />}
                Save Configuration
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
              Are you sure you want to delete the project <strong>"{editingProject?.title}"</strong>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-4">
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)} className="rounded-lg font-bold text-xs uppercase tracking-wider">Cancel</Button>
            <Button variant="destructive" disabled={actionLoading} onClick={handleDelete} className="rounded-lg font-bold text-xs uppercase tracking-wider">
              {actionLoading && <RefreshCw size={14} className="animate-spin mr-2" />}
              Delete Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
