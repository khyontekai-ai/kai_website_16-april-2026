'use client'

import { useState, useEffect } from 'react'
import { RefreshCw } from 'lucide-react'

import AdminLogin from '@/components/admin/AdminLogin'
import AdminLayout from '@/components/admin/AdminLayout'
import DashboardStats from '@/components/admin/DashboardStats'
import ProjectsManager from '@/components/admin/ProjectsManager'
import ReviewsManager from '@/components/admin/ReviewsManager'
import CaseStudiesManager from '@/components/admin/CaseStudiesManager'

export default function AdminClient() {
  const [token, setToken] = useState('')
  const [checkingLogin, setCheckingLogin] = useState(true)
  const [loginError, setLoginError] = useState('')
  
  const [activeTab, setActiveTab] = useState('projects')
  const [projects, setProjects] = useState([])
  const [reviews, setReviews] = useState([])
  const [caseStudies, setCaseStudies] = useState([])
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedToken = localStorage.getItem('adminToken')
      if (savedToken) setToken(savedToken)
    }
    setCheckingLogin(false)
  }, [])

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 4000)
      return () => clearTimeout(timer)
    }
  }, [alert])

  const triggerAlert = (type, message) => setAlert({ type, message })

  const fetchData = async () => {
    setLoading(true)
    try {
      const [projRes, revRes, csRes] = await Promise.all([
        fetch('/api/projects', { cache: 'no-store' }),
        fetch('/api/reviews', { cache: 'no-store' }),
        fetch('/api/casestudies', { cache: 'no-store' })
      ])
      if (projRes.ok && revRes.ok && csRes.ok) {
        setProjects(await projRes.json())
        setReviews(await revRes.json())
        setCaseStudies(await csRes.json())
      } else {
        triggerAlert('error', 'Failed to retrieve records from the database.')
      }
    } catch (err) {
      triggerAlert('error', 'Network error. Could not connect to API.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) fetchData()
  }, [token])

  const handleLogin = async (password) => {
    setLoginError('')
    setCheckingLogin(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      const data = await res.json()
      if (res.ok && data.success) {
        localStorage.setItem('adminToken', data.token)
        setToken(data.token)
      } else {
        setLoginError(data.error || 'Authentication failed. Please check password.')
      }
    } catch (err) {
      setLoginError('Could not verify credentials. Server offline.')
    } finally {
      setCheckingLogin(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    setToken('')
    setProjects([])
    setReviews([])
    setCaseStudies([])
  }

  const saveProject = async (form, existingItem) => {
    setActionLoading(true)
    const isEdit = !!existingItem
    const url = isEdit ? `/api/projects/${existingItem.id || existingItem._id}` : '/api/projects'
    try {
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(form)
      })
      if (res.ok) {
        triggerAlert('success', `Project successfully ${isEdit ? 'updated' : 'created'}.`)
        fetchData()
      } else {
        const errData = await res.json()
        triggerAlert('error', errData.error || 'Failed to submit project.')
      }
    } catch (err) {
      triggerAlert('error', 'Network failure.')
    } finally {
      setActionLoading(false)
    }
  }

  const saveReview = async (form, existingItem) => {
    setActionLoading(true)
    const isEdit = !!existingItem
    const url = isEdit ? `/api/reviews/${existingItem.id || existingItem._id}` : '/api/reviews'
    try {
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(form)
      })
      if (res.ok) {
        triggerAlert('success', `Review successfully ${isEdit ? 'updated' : 'created'}.`)
        fetchData()
      } else {
        const errData = await res.json()
        triggerAlert('error', errData.error || 'Failed to submit review.')
      }
    } catch (err) {
      triggerAlert('error', 'Network failure.')
    } finally {
      setActionLoading(false)
    }
  }

  const saveCaseStudy = async (form, existingItem) => {
    setActionLoading(true)
    const isEdit = !!existingItem
    const url = isEdit ? `/api/casestudies/${existingItem.id || existingItem._id}` : '/api/casestudies'
    try {
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(form)
      })
      if (res.ok) {
        triggerAlert('success', `Case study successfully ${isEdit ? 'updated' : 'created'}.`)
        fetchData()
      } else {
        const errData = await res.json()
        triggerAlert('error', errData.error || 'Failed to submit case study.')
      }
    } catch (err) {
      triggerAlert('error', 'Network failure.')
    } finally {
      setActionLoading(false)
    }
  }

  const deleteItem = async (type, id) => {
    setActionLoading(true)
    try {
      const res = await fetch(`/api/${type}s/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        triggerAlert('success', `${type} deleted successfully.`)
        fetchData()
      } else {
        const errData = await res.json()
        triggerAlert('error', errData.error || `Unable to remove ${type}.`)
      }
    } catch (err) {
      triggerAlert('error', 'Network error during delete sequence.')
    } finally {
      setActionLoading(false)
    }
  }

  if (checkingLogin && !token) {
    return <div className="min-h-screen bg-dark-navy flex items-center justify-center"><RefreshCw className="text-royal-blue animate-spin w-8 h-8" /></div>
  }

  if (!token) {
    return <AdminLogin onLogin={handleLogin} error={loginError} isLoading={checkingLogin} />
  }

  return (
    <AdminLayout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      onLogout={handleLogout} 
      alert={alert}
    >
      <DashboardStats 
        projects={projects} 
        reviews={reviews} 
        activeTab={activeTab} 
      />
      
      {loading ? (
        <div className="flex flex-col justify-center items-center py-20 gap-3">
          <RefreshCw className="w-8 h-8 text-royal-blue animate-spin" />
          <span className="text-xs text-mid-grey font-fira-code">// Syncing database...</span>
        </div>
      ) : (
        activeTab === 'projects' ? (
          <ProjectsManager 
            projects={projects} 
            onSave={saveProject} 
            onDelete={deleteItem} 
            actionLoading={actionLoading} 
          />
        ) : activeTab === 'reviews' ? (
          <ReviewsManager 
            reviews={reviews} 
            onSave={saveReview} 
            onDelete={deleteItem} 
            actionLoading={actionLoading} 
          />
        ) : (
          <CaseStudiesManager 
            casestudies={caseStudies} 
            onSave={saveCaseStudy} 
            onDelete={deleteItem} 
            actionLoading={actionLoading} 
          />
        )
      )}
    </AdminLayout>
  )
}
