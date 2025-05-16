import { useEffect, useState } from 'react';
import { WebtoonType } from '../types';
import {
  getPopularWebtoons,
  getNewWebtoons,
  getPersonalizedRecommendations
} from '../lib/recommendation';

interface RecommendationSectionProps {
  userId: string;
}

export default function RecommendationSection({ userId }: RecommendationSectionProps) {
  const [popularWebtoons, setPopularWebtoons] = useState<WebtoonType[]>([]);
  const [newWebtoons, setNewWebtoons] = useState<WebtoonType[]>([]);
  const [personalizedWebtoons, setPersonalizedWebtoons] = useState<WebtoonType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const [popular, newItems, personalized] = await Promise.all([
          getPopularWebtoons(),
          getNewWebtoons(),
          getPersonalizedRecommendations(userId, []) // TODO: Pass actual user history
        ]);

        setPopularWebtoons(popular);
        setNewWebtoons(newItems);
        setPersonalizedWebtoons(personalized);
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [userId]);

  if (loading) {
    return <div>Loading recommendations...</div>;
  }

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">추천 웹툰</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {personalizedWebtoons.map((webtoon) => (
            <WebtoonCard key={webtoon.id} webtoon={webtoon} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">인기 웹툰</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {popularWebtoons.map((webtoon) => (
            <WebtoonCard key={webtoon.id} webtoon={webtoon} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">신작 웹툰</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {newWebtoons.map((webtoon) => (
            <WebtoonCard key={webtoon.id} webtoon={webtoon} />
          ))}
        </div>
      </section>
    </div>
  );
}

interface WebtoonCardProps {
  webtoon: WebtoonType;
}

function WebtoonCard({ webtoon }: WebtoonCardProps) {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <img
        src={webtoon.thumbnailUrl}
        alt={webtoon.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{webtoon.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{webtoon.author}</p>
        <div className="flex items-center">
          <span className="text-yellow-500">★</span>
          <span className="ml-1">{webtoon.rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
} 