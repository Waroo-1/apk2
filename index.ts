export type UserRole = 'freelancer' | 'client';

export interface User {
  id: string;
  email: string;
  role: UserRole;
}

export interface Profile {
  id: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country: string;
  profilePhotoUrl?: string;
  bio?: string;
  languages?: string[];
  personalWebsite?: string;
  companyName?: string;
  industry?: string;
  preferredSkills?: string[];
  budgetRangeMin?: number;
  budgetRangeMax?: number;
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Occupation {
  id: string;
  profileId: string;
  title: string;
  isCustom: boolean;
  createdAt: string;
}

export interface Experience {
  id: string;
  profileId: string;
  occupation: string;
  yearsFrom: number;
  yearsTo: number;
  createdAt: string;
}

export interface Skill {
  id: string;
  profileId: string;
  skillName: string;
  level: 'Beginner' | 'Intermediate' | 'Expert';
  createdAt: string;
}

export interface Project {
  id: string;
  profileId: string;
  title: string;
  description: string;
  imageUrl?: string;
  projectLinks?: string[];
  createdAt: string;
}

export interface Education {
  id: string;
  profileId: string;
  college: string;
  degree: string;
  passoutYear: number;
  createdAt: string;
}

export interface Certification {
  id: string;
  profileId: string;
  name: string;
  issuedBy: string;
  year: number;
  documentUrl?: string;
  createdAt: string;
}

export interface Gig {
  id: string;
  sellerId: string;
  title: string;
  category: string;
  subcategory?: string;
  isCustomCategory: boolean;
  description: string;
  tags?: string[];
  requirements?: string;
  galleryUrls?: string[];
  basicPrice: number;
  basicDescription: string;
  basicDeliveryDays: number;
  standardPrice?: number;
  standardDescription?: string;
  standardDeliveryDays?: number;
  premiumPrice?: number;
  premiumDescription?: string;
  premiumDeliveryDays?: number;
  extraFastDelivery: boolean;
  extraFastDeliveryPrice?: number;
  customOrdersEnabled: boolean;
  status: 'active' | 'paused' | 'deleted';
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  buyerId: string;
  sellerId: string;
  gigId: string;
  packageType: 'basic' | 'standard' | 'premium';
  totalAmount: number;
  dueDate: string;
  note?: string;
  status: 'active' | 'delivered' | 'completed' | 'cancelled' | 'late';
  priority: boolean;
  deliveryFiles?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Connection {
  id: string;
  requesterId: string;
  recipientId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  orderId?: string;
  senderId: string;
  receiverId: string;
  content: string;
  attachments?: string[];
  isProjectUpdate: boolean;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'connection' | 'order' | 'payment' | 'project_update';
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  orderId?: string;
  amount: number;
  currency: string;
  documentType: 'invoice' | 'receipt' | 'refund';
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

export interface PaymentMethod {
  id: string;
  userId: string;
  type: 'paypal' | 'stripe' | 'bank';
  maskedInfo: string;
  isDefault: boolean;
  createdAt: string;
}
