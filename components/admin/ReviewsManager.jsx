import { useState } from 'react'
import { Star, Edit, Trash2, Plus, RefreshCw } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={i <= rating ? 'text-amber-gold fill-amber-gold' : 'text-gray-300'}
        />
      ))}
    </div>
  )
}

export default function ReviewsManager({ reviews, onSave, onDelete, actionLoading }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [editingReview, setEditingReview] = useState(null)
  
  const [form, setForm] = useState({
    name: '',
    rating: 5,
    text: ''
  })

  const openAdd = () => {
    setForm({ name: '', rating: 5, text: '' })
    setEditingReview(null)
    setModalOpen(true)
  }

  const openEdit = (rev) => {
    setForm({
      name: rev.name || '',
      rating: rev.rating || 5,
      text: rev.text || ''
    })
    setEditingReview(rev)
    setModalOpen(true)
  }

  const openDelete = (rev) => {
    setEditingReview(rev)
    setDeleteModalOpen(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    await onSave(form, editingReview)
    setModalOpen(false)
  }

  const handleDelete = async () => {
    await onDelete('review', editingReview.id || editingReview._id)
    setDeleteModalOpen(false)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-light-grey/50">
        <h3 className="text-base font-bold text-dark-navy uppercase tracking-tight font-nunito">
          Workshop Reviews Catalogue
        </h3>
        <Button onClick={openAdd} className="bg-royal-blue hover:bg-dark-navy text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm">
          <Plus size={14} className="mr-2" /> Add Review
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-light-grey">
            <TableRow>
              <TableHead className="text-[10px] uppercase font-extrabold tracking-wider text-dark-navy font-fira-code py-3">Author</TableHead>
              <TableHead className="text-[10px] uppercase font-extrabold tracking-wider text-dark-navy font-fira-code py-3">Rating</TableHead>
              <TableHead className="text-[10px] uppercase font-extrabold tracking-wider text-dark-navy font-fira-code py-3">Review Text</TableHead>
              <TableHead className="text-right text-[10px] uppercase font-extrabold tracking-wider text-dark-navy font-fira-code py-3">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.length > 0 ? (
              reviews.map((rev) => (
                <TableRow key={rev.id || rev._id} className="hover:bg-pale-blue/10">
                  <TableCell className="whitespace-nowrap">
                    <div className="text-sm font-bold text-dark-navy">{rev.name}</div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <StarRating rating={rev.rating} />
                  </TableCell>
                  <TableCell>
                    <p className="text-xs text-dark-grey line-clamp-2 font-light font-nunito">"{rev.text}"</p>
                  </TableCell>
                  <TableCell className="text-right whitespace-nowrap space-x-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(rev)} className="text-royal-blue hover:bg-pale-blue/30 rounded-lg" title="Edit">
                      <Edit size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => openDelete(rev)} className="text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg" title="Delete">
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12 text-mid-grey text-sm">
                  No workshop reviews found. Click 'Add Review' to populate.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Save Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-lg font-nunito">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-dark-navy uppercase tracking-tight">
              {editingReview ? 'Modify Review Data' : 'Add Attendee Review'}
            </DialogTitle>
            <DialogDescription className="text-xs font-fira-code text-mid-grey">
              // Verified feedback editor
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-[10px] uppercase font-bold text-dark-navy tracking-wide mb-1 font-fira-code">Attendee Name / Designation</label>
                <Input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. Student, Tangla College" className="focus-visible:ring-royal-blue" />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-dark-navy tracking-wide mb-1 font-fira-code">Stars Rating</label>
                <Select value={form.rating.toString()} onValueChange={val => setForm({...form, rating: Number(val)})}>
                  <SelectTrigger className="focus:ring-royal-blue font-semibold text-dark-navy">
                    <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 4, 3, 2, 1].map(val => (
                      <SelectItem key={val} value={val.toString()}>{val} Stars</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-dark-navy tracking-wide mb-1 font-fira-code">Review Message</label>
              <Textarea required rows={5} value={form.text} onChange={e => setForm({...form, text: e.target.value})} placeholder="Feedback text here..." className="focus-visible:ring-royal-blue resize-none" />
            </div>
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="rounded-lg font-bold text-xs uppercase tracking-wider">Cancel</Button>
              <Button type="submit" disabled={actionLoading} className="bg-royal-blue hover:bg-dark-navy text-white rounded-lg font-bold text-xs uppercase tracking-wider">
                {actionLoading && <RefreshCw size={14} className="animate-spin mr-2" />}
                Save Review
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
              Are you sure you want to delete the review by <strong>"{editingReview?.name}"</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-4">
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)} className="rounded-lg font-bold text-xs uppercase tracking-wider">Cancel</Button>
            <Button variant="destructive" disabled={actionLoading} onClick={handleDelete} className="rounded-lg font-bold text-xs uppercase tracking-wider">
              {actionLoading && <RefreshCw size={14} className="animate-spin mr-2" />}
              Delete Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
