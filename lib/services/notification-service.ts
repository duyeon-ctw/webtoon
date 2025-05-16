import { User } from '@/lib/types';

export interface Notification {
  id: string;
  userId: string;
  type: 'episode_update' | 'comment_reply' | 'comment_like' | 'subscription' | 'announcement' | 'recommendation';
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
  metadata?: Record<string, any>;
}

export interface NotificationPreferences {
  episodeUpdates: boolean;
  commentReplies: boolean;
  commentLikes: boolean;
  creatorAnnouncements: boolean;
  recommendations: boolean;
  marketingEmails: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

// Mock notifications data for demo purposes
const mockNotifications: Record<string, Notification[]> = {
  'user1': [
    {
      id: 'notif-1',
      userId: 'user1',
      type: 'episode_update',
      title: 'New Episode Available',
      message: 'The Cosmic Journey has a new episode: "Beyond the Stars"',
      link: '/read/cosmic-journey/ep53',
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
      metadata: {
        webtoonId: 'cosmic-journey',
        episodeId: 'ep53',
        webtoonTitle: 'The Cosmic Journey',
        episodeNumber: 53,
      },
    },
    {
      id: 'notif-2',
      userId: 'user1',
      type: 'comment_reply',
      title: 'New Reply to Your Comment',
      message: 'Michael Smith replied to your comment: "I agree! The latest chapter was such a plot twist!"',
      link: '/read/cosmic-journey/ep52#comment-reply1',
      isRead: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      metadata: {
        webtoonId: 'cosmic-journey',
        episodeId: 'ep52',
        commentId: 'comment1',
        replyId: 'reply1',
        replierName: 'Michael Smith',
      },
    },
    {
      id: 'notif-3',
      userId: 'user1',
      type: 'announcement',
      title: 'Platform Update',
      message: 'We have updated our platform with new features and improvements. Check them out!',
      link: '/announcements/platform-update-june-2024',
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    },
    {
      id: 'notif-4',
      userId: 'user1',
      type: 'recommendation',
      title: 'Recommended for You',
      message: 'Based on your reading history, you might enjoy "Spirit Walker"',
      link: '/webtoon/spirit-walker',
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), // 36 hours ago
      metadata: {
        webtoonId: 'spirit-walker',
        webtoonTitle: 'Spirit Walker',
        genre: ['Fantasy', 'Adventure'],
      },
    },
  ],
};

// Mock notification preferences for demo purposes
const mockNotificationPreferences: Record<string, NotificationPreferences> = {
  'user1': {
    episodeUpdates: true,
    commentReplies: true,
    commentLikes: false,
    creatorAnnouncements: true,
    recommendations: true,
    marketingEmails: false,
    emailNotifications: true,
    pushNotifications: true,
  },
};

export class NotificationService {
  // Get user's notifications
  static async getUserNotifications(userId: string): Promise<Notification[]> {
    // In a real app, this would fetch from a database
    return mockNotifications[userId] || [];
  }

  // Get user's notification preferences
  static async getUserNotificationPreferences(userId: string): Promise<NotificationPreferences> {
    // In a real app, this would fetch from a database
    return mockNotificationPreferences[userId] || {
      episodeUpdates: true,
      commentReplies: true,
      commentLikes: true,
      creatorAnnouncements: true,
      recommendations: true,
      marketingEmails: false,
      emailNotifications: true,
      pushNotifications: true,
    };
  }

  // Update user's notification preferences
  static async updateNotificationPreferences(
    userId: string, 
    preferences: Partial<NotificationPreferences>
  ): Promise<NotificationPreferences> {
    // In a real app, this would update a database
    if (!mockNotificationPreferences[userId]) {
      mockNotificationPreferences[userId] = {
        episodeUpdates: true,
        commentReplies: true,
        commentLikes: true,
        creatorAnnouncements: true,
        recommendations: true,
        marketingEmails: false,
        emailNotifications: true,
        pushNotifications: true,
      };
    }

    mockNotificationPreferences[userId] = {
      ...mockNotificationPreferences[userId],
      ...preferences,
    };

    return mockNotificationPreferences[userId];
  }

  // Mark a notification as read
  static async markAsRead(userId: string, notificationId: string): Promise<Notification | null> {
    // In a real app, this would update a database
    const userNotifications = mockNotifications[userId];
    if (!userNotifications) return null;

    const notification = userNotifications.find(n => n.id === notificationId);
    if (!notification) return null;

    notification.isRead = true;
    return notification;
  }

  // Mark all notifications as read
  static async markAllAsRead(userId: string): Promise<boolean> {
    // In a real app, this would update a database
    const userNotifications = mockNotifications[userId];
    if (!userNotifications) return false;

    userNotifications.forEach(notification => {
      notification.isRead = true;
    });

    return true;
  }

  // Delete a notification
  static async deleteNotification(userId: string, notificationId: string): Promise<boolean> {
    // In a real app, this would update a database
    const userNotifications = mockNotifications[userId];
    if (!userNotifications) return false;

    const index = userNotifications.findIndex(n => n.id === notificationId);
    if (index === -1) return false;

    userNotifications.splice(index, 1);
    return true;
  }

  // Create a new notification
  static async createNotification(notification: Omit<Notification, 'id' | 'createdAt'>): Promise<Notification> {
    // In a real app, this would insert into a database
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    if (!mockNotifications[notification.userId]) {
      mockNotifications[notification.userId] = [];
    }

    mockNotifications[notification.userId].unshift(newNotification);

    // In a real app, this would also send push notifications or emails based on user preferences
    return newNotification;
  }

  // Create a new episode update notification for all subscribers
  static async notifyNewEpisode(
    webtoonId: string, 
    webtoonTitle: string, 
    episodeId: string, 
    episodeNumber: number, 
    episodeTitle: string
  ): Promise<void> {
    // In a real app, this would:
    // 1. Query all users who follow this webtoon
    // 2. Filter users based on their notification preferences
    // 3. Create a notification for each user
    // 4. Send push notifications and/or emails

    // For demo purposes, just create a notification for our mock user
    if (mockNotificationPreferences['user1']?.episodeUpdates) {
      this.createNotification({
        userId: 'user1',
        type: 'episode_update',
        title: 'New Episode Available',
        message: `${webtoonTitle} has a new episode: "${episodeTitle}"`,
        link: `/read/${webtoonId}/${episodeId}`,
        isRead: false,
        metadata: {
          webtoonId,
          episodeId,
          webtoonTitle,
          episodeNumber,
          episodeTitle,
        },
      });
    }
  }

  // Create a comment reply notification
  static async notifyCommentReply(
    receiverUserId: string,
    replierName: string,
    commentText: string,
    replyText: string,
    webtoonId: string,
    episodeId: string,
    commentId: string,
    replyId: string
  ): Promise<void> {
    // Check if user wants comment reply notifications
    if (!mockNotificationPreferences[receiverUserId]?.commentReplies) {
      return;
    }

    await this.createNotification({
      userId: receiverUserId,
      type: 'comment_reply',
      title: 'New Reply to Your Comment',
      message: `${replierName} replied to your comment: "${replyText.substring(0, 50)}${replyText.length > 50 ? '...' : ''}"`,
      link: `/read/${webtoonId}/${episodeId}#comment-${replyId}`,
      isRead: false,
      metadata: {
        webtoonId,
        episodeId,
        commentId,
        replyId,
        replierName,
        commentText,
        replyText,
      },
    });
  }

  // Send a platform announcement to all users
  static async createAnnouncement(
    title: string,
    message: string,
    link?: string
  ): Promise<void> {
    // In a real app, this would:
    // 1. Create an announcement record in the database
    // 2. Queue up notifications for all users who have announcements enabled
    // 3. Send push notifications and/or emails in batches

    // For demo purposes, just create a notification for our mock user
    if (mockNotificationPreferences['user1']?.creatorAnnouncements) {
      await this.createNotification({
        userId: 'user1',
        type: 'announcement',
        title,
        message,
        link,
        isRead: false,
      });
    }
  }

  // Send personalized recommendations to users
  static async sendRecommendation(
    userId: string,
    webtoonId: string,
    webtoonTitle: string,
    reason: string,
    genres: string[]
  ): Promise<void> {
    // Check if user wants recommendations
    if (!mockNotificationPreferences[userId]?.recommendations) {
      return;
    }

    await this.createNotification({
      userId,
      type: 'recommendation',
      title: 'Recommended for You',
      message: `Based on ${reason}, you might enjoy "${webtoonTitle}"`,
      link: `/webtoon/${webtoonId}`,
      isRead: false,
      metadata: {
        webtoonId,
        webtoonTitle,
        reason,
        genre: genres,
      },
    });
  }

  // Get unread notification count
  static async getUnreadCount(userId: string): Promise<number> {
    const notifications = await this.getUserNotifications(userId);
    return notifications.filter(n => !n.isRead).length;
  }
} 