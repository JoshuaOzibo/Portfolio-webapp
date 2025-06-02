"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Eye, Reply, Trash2, Mail, Clock } from "lucide-react"

export default function MessagesPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      subject: "Project Collaboration Inquiry",
      message:
        "Hi! I came across your portfolio and I'm impressed with your work. I'd like to discuss a potential collaboration on a React project. Are you available for a quick call this week?",
      date: "2024-01-15T10:30:00Z",
      status: "unread",
      priority: "high",
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike.chen@techcorp.com",
      subject: "Job Opportunity - Senior Developer",
      message:
        "Hello, we have an exciting opportunity for a Senior Full Stack Developer position at our company. Your experience with React and Node.js caught our attention. Would you be interested in learning more?",
      date: "2024-01-14T14:20:00Z",
      status: "read",
      priority: "high",
    },
    {
      id: 3,
      name: "Emily Davis",
      email: "emily@startup.io",
      subject: "Freelance Project Inquiry",
      message:
        "Hi there! We're a startup looking for a developer to help us build our MVP. The project involves React, Node.js, and PostgreSQL. Could we schedule a call to discuss the details?",
      date: "2024-01-13T09:15:00Z",
      status: "replied",
      priority: "medium",
    },
    {
      id: 4,
      name: "Alex Rodriguez",
      email: "alex.r@design.com",
      subject: "Portfolio Feedback",
      message:
        "Love your portfolio design! The projects section is particularly well done. I'm also a developer and would love to connect and share some ideas.",
      date: "2024-01-12T16:45:00Z",
      status: "read",
      priority: "low",
    },
  ])

  const [selectedMessage, setSelectedMessage] = useState(null)
  const [isViewingMessage, setIsViewingMessage] = useState(false)
  const [isReplying, setIsReplying] = useState(false)

  const getStatusColor = (status) => {
    switch (status) {
      case "unread":
        return "bg-blue-100 text-blue-800"
      case "read":
        return "bg-gray-100 text-gray-800"
      case "replied":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleViewMessage = (message) => {
    setSelectedMessage(message)
    setIsViewingMessage(true)
    // Mark as read
    if (message.status === "unread") {
      setMessages(messages.map((m) => (m.id === message.id ? { ...m, status: "read" } : m)))
    }
  }

  const unreadCount = messages.filter((m) => m.status === "unread").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
          <p className="text-gray-600 mt-2">Manage messages from your portfolio visitors</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="text-sm">
            {unreadCount} unread
          </Badge>
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Messages Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{messages.length}</p>
                <p className="text-sm text-gray-600">Total Messages</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Eye className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
                <p className="text-sm text-gray-600">Unread</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Reply className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {messages.filter((m) => m.status === "replied").length}
                </p>
                <p className="text-sm text-gray-600">Replied</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {messages.filter((m) => m.priority === "high").length}
                </p>
                <p className="text-sm text-gray-600">High Priority</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>From</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <TableRow key={message.id} className={message.status === "unread" ? "bg-blue-50" : ""}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">{message.name}</p>
                        <p className="text-sm text-gray-500">{message.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium text-gray-900">{message.subject}</p>
                      <p className="text-sm text-gray-500 truncate max-w-xs">{message.message.substring(0, 60)}...</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{formatDate(message.date)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-xs ${getPriorityColor(message.priority)}`}>{message.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-xs ${getStatusColor(message.status)}`}>{message.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewMessage(message)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Reply className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Message Dialog */}
      <Dialog open={isViewingMessage} onOpenChange={setIsViewingMessage}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">From:</span>
                  <p className="text-gray-900">{selectedMessage.name}</p>
                  <p className="text-gray-600">{selectedMessage.email}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Date:</span>
                  <p className="text-gray-900">{formatDate(selectedMessage.date)}</p>
                </div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Subject:</span>
                <p className="text-gray-900 mt-1">{selectedMessage.subject}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Message:</span>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-900 leading-relaxed">{selectedMessage.message}</p>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsViewingMessage(false)}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setIsViewingMessage(false)
                    setIsReplying(true)
                  }}
                >
                  <Reply className="mr-2 h-4 w-4" />
                  Reply
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog open={isReplying} onOpenChange={setIsReplying}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Reply to Message</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="text-sm text-gray-600">
                <p>To: {selectedMessage.email}</p>
                <p>Re: {selectedMessage.subject}</p>
              </div>
              <div>
                <Textarea placeholder="Type your reply here..." rows={8} className="w-full" />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsReplying(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setIsReplying(false)
                    // Update message status to replied
                    setMessages(messages.map((m) => (m.id === selectedMessage.id ? { ...m, status: "replied" } : m)))
                  }}
                >
                  Send Reply
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
