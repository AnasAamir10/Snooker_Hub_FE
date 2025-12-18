import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SuccessAlert from '../components/SuccessAlert'
import ConfirmationAlert from '../components/ConfirmationAlert'
import AdminNavbar from '../components/AdminDashboard/AdminNavbar'
import AdminProfileCard from '../components/AdminDashboard/AdminProfileCard'
import StatsOverview from '../components/AdminDashboard/StatsOverview'
import AdminLayout from '../components/AdminDashboard/AdminLayout'
import TabNavigation from '../components/AdminDashboard/TabNavigation'
import OverviewTab from '../components/AdminDashboard/OverviewTab'
import TournamentsTab from '../components/AdminDashboard/TournamentsTab'
import UsersTab from '../components/AdminDashboard/UsersTab'
import TournamentModal from '../components/AdminDashboard/TournamentModal'
import { tournamentAPI, userAPI, registrationAPI } from '../services/api'
import AOS from 'aos'
import 'aos/dist/aos.css'
import feather from 'feather-icons'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [tournaments, setTournaments] = useState([])
  const [loading, setLoading] = useState(true)
  const [imageFile, setImageFile] = useState(null)
  const [registeredUsers, setRegisteredUsers] = useState([])
  const [pendingRequests, setPendingRequests] = useState([])

  const [newTournament, setNewTournament] = useState({
    name: '',
    date: '',
    fee: '',
    description: '',
    image: '',
    maxPlayers: 32
  })

  const [editingTournament, setEditingTournament] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showConfirmationAlert, setShowConfirmationAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [tournamentToDelete, setTournamentToDelete] = useState(null)
  const [userToDelete, setUserToDelete] = useState(null)

  // Fetch data on component mount
  useEffect(() => {
    fetchData()
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true })
    feather.replace()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      // Fetch tournaments
      const tournamentsData = await tournamentAPI.getAll()
      setTournaments(tournamentsData)

      // Fetch registrations
      const registrationsData = await registrationAPI.getAll()
      const approved = registrationsData.filter(r => r.paymentStatus === 'paid')
      const pending = registrationsData.filter(r => r.paymentStatus === 'pending')
      setRegisteredUsers(approved)
      setPendingRequests(pending)

      // Fetch users for user tab
      const usersData = await userAPI.getAll()
      // You can use this for the users tab if needed
    } catch (error) {
      console.error('Error fetching data:', error)
      setAlertMessage('Failed to load data. Please refresh the page.')
      setShowSuccessAlert(true)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (editingTournament) {
      setEditingTournament({
        ...editingTournament,
        [name]: value
      })
    } else {
      setNewTournament({
        ...newTournament,
        [name]: value
      })
    }
  }

  const handleFileChange = (file) => {
    setImageFile(file)
  }

  const handleAddTournament = async (e) => {
    e.preventDefault()
    try {
      const result = await tournamentAPI.create(newTournament, imageFile)
      if (result.success) {
        await fetchData() // Refresh data
        setNewTournament({ name: '', date: '', fee: '', description: '', image: '', maxPlayers: 32 })
        setImageFile(null)
        setShowModal(false)
        setAlertMessage('Tournament added successfully!')
        setShowSuccessAlert(true)
      }
    } catch (error) {
      setAlertMessage(error.message || 'Failed to add tournament')
      setShowSuccessAlert(true)
    }
  }

  const handleUpdateTournament = async (e) => {
    e.preventDefault()
    try {
      const result = await tournamentAPI.update(editingTournament.id, editingTournament, imageFile)
      if (result.success) {
        await fetchData() // Refresh data
        setEditingTournament(null)
        setImageFile(null)
        setShowModal(false)
        setAlertMessage('Tournament updated successfully!')
        setShowSuccessAlert(true)
      }
    } catch (error) {
      setAlertMessage(error.message || 'Failed to update tournament')
      setShowSuccessAlert(true)
    }
  }

  const handleEditTournament = (tournament) => {
    setEditingTournament(tournament)
    setShowModal(true)
  }

  const handleDeleteTournament = (id) => {
    setTournamentToDelete(id)
    setShowConfirmationAlert(true)
  }

  const confirmDeleteTournament = async () => {
    try {
      await tournamentAPI.delete(tournamentToDelete)
      await fetchData() // Refresh data
      setShowConfirmationAlert(false)
      setTournamentToDelete(null)
      setAlertMessage('Tournament deleted successfully!')
      setShowSuccessAlert(true)
    } catch (error) {
      setAlertMessage(error.message || 'Failed to delete tournament')
      setShowSuccessAlert(true)
      setShowConfirmationAlert(false)
      setTournamentToDelete(null)
    }
  }

  const cancelDelete = () => {
    setShowConfirmationAlert(false)
    setTournamentToDelete(null)
    setUserToDelete(null)
  }

  const handleDeleteUser = (id) => {
    setUserToDelete(id)
    setShowConfirmationAlert(true)
  }

  const confirmDeleteUser = async () => {
    try {
      await userAPI.delete(userToDelete)
      await fetchData() // Refresh data
      setShowConfirmationAlert(false)
      setUserToDelete(null)
      setAlertMessage('User removed successfully!')
      setShowSuccessAlert(true)
    } catch (error) {
      setAlertMessage(error.message || 'Failed to delete user')
      setShowSuccessAlert(true)
      setShowConfirmationAlert(false)
      setUserToDelete(null)
    }
  }

  const handleApproveRequest = async (requestId) => {
    try {
      await registrationAPI.update(requestId, { paymentStatus: 'paid' })
      await fetchData() // Refresh data
      setAlertMessage('Registration approved successfully!')
      setShowSuccessAlert(true)
    } catch (error) {
      setAlertMessage(error.message || 'Failed to approve registration')
      setShowSuccessAlert(true)
    }
  }

  const handleRejectRequest = async (requestId) => {
    try {
      await registrationAPI.cancel(requestId)
      await fetchData() // Refresh data
      setAlertMessage('Registration rejected successfully!')
      setShowSuccessAlert(true)
    } catch (error) {
      setAlertMessage(error.message || 'Failed to reject registration')
      setShowSuccessAlert(true)
    }
  }

  const openAddModal = () => {
    setEditingTournament(null)
    setNewTournament({ name: '', date: '', fee: '', description: '', image: '', maxPlayers: 32 })
    setImageFile(null)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingTournament(null)
    setImageFile(null)
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewTab 
            pendingRequests={pendingRequests}
            registeredUsers={registeredUsers}
            tournaments={tournaments}
            onApproveRequest={handleApproveRequest}
            onRejectRequest={handleRejectRequest}
          />
        )
      case 'tournaments':
        return (
          <TournamentsTab 
            tournaments={tournaments}
            onEditTournament={handleEditTournament}
            onDeleteTournament={handleDeleteTournament}
            onAddTournament={openAddModal}
          />
        )
      case 'users':
        return (
          <UsersTab 
            registeredUsers={registeredUsers}
            onDeleteUser={handleDeleteUser}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a]">
      <AdminNavbar />
      
      {showSuccessAlert && (
        <SuccessAlert 
          message={alertMessage}
          onClose={() => setShowSuccessAlert(false)}
        />
      )}

      {showConfirmationAlert && (
        <ConfirmationAlert 
          title={userToDelete ? "Remove User?" : "Delete Tournament?"}
          message={userToDelete 
            ? "This user will be removed from the registration list." 
            : "This action cannot be undone. The tournament will be permanently deleted."
          }
          confirmText={userToDelete ? "Remove User" : "Delete Tournament"}
          type={userToDelete ? "warning" : "danger"}
          onConfirm={userToDelete ? confirmDeleteUser : confirmDeleteTournament}
          onCancel={cancelDelete}
        />
      )}

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#121212] rounded-2xl shadow-2xl p-8 border border-gray-800">
            <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>
            
            <StatsOverview 
              tournaments={tournaments}
              registeredUsers={registeredUsers}
              pendingRequests={pendingRequests}
            />

            <AdminLayout
              sidebar={<AdminProfileCard />}
              content={
                <>
                  <TabNavigation 
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    registeredUsersCount={registeredUsers.length}
                  />
                  {renderActiveTab()}
                </>
              }
            />
          </div>
        </div>
      </div>

      {showModal && (
        <TournamentModal
          editingTournament={editingTournament}
          newTournament={newTournament}
          showModal={showModal}
          onClose={closeModal}
          onInputChange={handleInputChange}
          onFileChange={handleFileChange}
          onSubmit={editingTournament ? handleUpdateTournament : handleAddTournament}
        />
      )}

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white text-xl">Loading...</div>
        </div>
      )}
    </div>
  )
}