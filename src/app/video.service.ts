import { Injectable } from '@angular/core';
import { Video } from '../app/models/video';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private router: Router) {}

  private videos: Video[] = [
    {
      id: '1',
      title: 'Morning Yoga Flow',
      description:
        'Start your day with a rejuvenating yoga flow that helps wake up your body and mind. This session focuses on gentle stretching, deep breathing, and mindful movement to set a positive tone for the rest of your day.',
      filePath: 'videos/854370-hd_1280_720_30fps.mp4',
      category: 'yoga',
      access: 'premium',
      duration: 600,
      chips: ['yoga', 'calming', 'energizing'],
    },
    {
      id: '2',
      title: 'Deep Meditation Session',
      description:
        'Immerse yourself in a guided meditation that promotes deep relaxation and mindfulness. This session is perfect for relieving stress, improving focus, and fostering inner peace through breathing techniques and visualization.',
      filePath: 'videos/2790143-uhd_3840_2160_25fps.mp4',
      category: 'meditation',
      access: 'premium',
      duration: 900,
      chips: ['rejuvenating', 'calming', 'yoga'],
    },
    {
      id: '3',
      title: 'Breathing Techniques',
      description:
        'Learn powerful breathing exercises designed to enhance lung capacity, improve oxygen flow, and calm the nervous system. These techniques are beneficial for stress relief, relaxation, and overall well-being.',
      filePath: 'videos/2796307-uhd_3840_2160_25fps.mp4',
      category: 'breathing',
      access: 'premium',
      duration: 450,
      chips: ['yoga', 'stretching', 'calming'],
    },
    {
      id: '4',
      title: 'Evening Wind-Down Routine',
      description:
        'Unwind from the stresses of the day with this relaxing yoga and meditation session. Through gentle movements and calming breathwork, this session will help you release tension and prepare your body for a restful night’s sleep.',
      filePath: 'videos/3327726-hd_1920_1080_24fps.mp4',
      category: 'breathing',
      access: 'premium',
      duration: 450,
      chips: ['meditation', 'calming', 'stretching'],
    },
    {
      id: '5',
      title: 'Energy Boosting Yoga',
      description:
        'Revitalize your body with an invigorating yoga practice that combines dynamic movements, controlled breathing, and stretching. This session is designed to boost energy levels and leave you feeling refreshed and recharged.',
      filePath: 'videos/3327752-hd_1920_1080_24fps.mp4',
      category: 'breathing',
      access: 'premium',
      duration: 450,
      chips: ['yoga', 'energizing', 'rejuvenating'],
    },
    {
      id: '6',
      title: 'Calming Breathwork for Anxiety',
      description:
        'Practice deep, mindful breathing techniques to help manage stress and anxiety. This session focuses on diaphragmatic breathing and guided breath control exercises that can promote relaxation and mental clarity.',
      filePath: 'videos/3327805-hd_1920_1080_24fps.mp4',
      category: 'breathing',
      access: 'free',
      duration: 450,
      chips: ['calming', 'yoga', 'meditation'],
    },
    {
      id: '7',
      title: 'Rejuvenating Yoga Flow',
      description:
        'Refresh your body and mind with this rejuvenating yoga flow. This session features gentle stretching, breathwork, and movement sequences that help increase flexibility, reduce stiffness, and restore vitality.',
      filePath: 'videos/3327806-hd_1920_1080_24fps.mp4',
      category: 'breathing',
      access: 'free',
      duration: 450,
      chips: ['rejuvenating', 'yoga', 'energizing'],
    },
    {
      id: '8',
      title: 'Mindfulness Meditation for Focus',
      description:
        'Enhance your concentration and mental clarity with this guided mindfulness meditation. This practice includes grounding techniques and breath awareness to help you stay present, reduce distractions, and improve productivity.',
      filePath: 'videos/3327959-hd_1920_1080_24fps.mp4',
      category: 'breathing',
      access: 'free',
      duration: 450,
      chips: ['meditation', 'calming', 'yoga'],
    },
    {
      id: '9',
      title: 'Full-Body Stretching Routine',
      description:
        'Improve flexibility, reduce muscle tension, and release tightness with this full-body stretching routine. This session incorporates a variety of stretches that target different muscle groups, promoting relaxation and mobility.',
      filePath: 'videos/3327960-hd_1920_1080_24fps.mp4',
      category: 'breathing',
      access: 'free',
      duration: 450,
      chips: ['yoga', 'stretching', 'energizing'],
    },
  ];

  getVideos(): Video[] {
    return this.videos;
  }

  getVideosByCategory(category: string): Video[] {
    return this.videos.filter((video) => video.category === category);
  }

  getFreeVideos(): Video[] {
    return this.videos.filter((video) => video.access === 'free');
  }

  getPremiumVideos(): Video[] {
    return this.videos.filter((video) => video.access === 'premium');
  }

  getVideoById(id: string): Video {
    const video = this.videos.find((video) => video.id === id);
    if (!video) {
      this.router.navigate(['/']);
      throw new Error(`Video with ID ${id} not found`);
    }
    return video;
  }
}
