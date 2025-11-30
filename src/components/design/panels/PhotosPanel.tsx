import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { searchImages, getPhotos, type UnsplashImage } from '@/services/unsplash';

interface PhotosPanelProps {
  onSelectImage?: (url: string) => void;
}

export const PhotosPanel: React.FC<PhotosPanelProps> = ({ onSelectImage }) => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    loadImages(1);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim()) {
        setIsSearching(true);
        performSearch(query, 1);
      } else if (query === '') {
        setIsSearching(false);
        loadImages(1);
      }
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const loadImages = async (pageNum: number) => {
    setLoading(true);
    try {
      const data = await getPhotos(pageNum);
      if (pageNum === 1) {
        setImages(data);
      } else {
        setImages(prev => [...prev, ...data]);
      }
      setHasMore(data.length > 0);
      setPage(pageNum);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const performSearch = async (searchQuery: string, pageNum: number) => {
    setLoading(true);
    try {
      const data = await searchImages(searchQuery, pageNum);
      if (pageNum === 1) {
        setImages(data);
      } else {
        setImages(prev => [...prev, ...data]);
      }
      setHasMore(data.length > 0);
      setPage(pageNum);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 50 && !loading && hasMore) {
      const nextPage = page + 1;
      if (isSearching) {
        performSearch(query, nextPage);
      } else {
        loadImages(nextPage);
      }
    }
  };

  return (
    <div className="h-full w-[320px] bg-panel flex flex-col border-r border-border-base">
      <div className="p-4 flex flex-col h-full">
        <h3 className="text-txt-primary font-medium mb-4">Photos</h3>
        
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-input text-txt-primary px-4 py-2 pl-10 rounded-lg border border-border-base focus:border-brand outline-none text-sm"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-muted" size={16} />
        </div>

        <div className="text-xs text-brand mb-2 font-medium">Photos by Unsplash</div>

        <div 
          className="flex-1 overflow-y-auto min-h-0"
          onScroll={handleScroll}
        >
          <div className="columns-2 gap-2 space-y-2 pb-4">
            {images.map((img) => (
              <div 
                key={img.id} 
                className="relative group cursor-pointer overflow-hidden rounded-lg bg-input break-inside-avoid"
                onClick={() => onSelectImage?.(img.urls.regular)}
              >
                <img 
                  src={img.urls.small} 
                  alt={img.alt_description} 
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            ))}
          </div>
          {loading && (
            <div className="flex justify-center py-4">
              <span className="loading loading-spinner loading-md text-brand"></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
