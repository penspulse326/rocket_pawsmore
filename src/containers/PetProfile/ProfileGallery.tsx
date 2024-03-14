import { IconLayoutGrid, IconMedal, IconPinned } from '@tabler/icons-react';
import React, { useState, memo } from 'react';

import Milestones from './Gallery/Milestones';
import Moments from './Gallery/Moments';
import Posts from './Gallery/Posts';

interface TabType {
  TITLE: string;
  icon: React.ElementType;
}

function ProfileGallery() {
  const [selectedTab, setSelectedTab] = useState('貼文');

  const renderGallery = () => {
    switch (selectedTab) {
      case '貼文':
        return <Posts />;
      case '里程碑':
        return <Milestones />;
      case '回顧':
        return <Moments />;
      default:
        return null;
    }
  };

  const GalleryTabs = memo(function GalleryTabs() {
    const tabs: TabType[] = [
      { TITLE: '貼文', icon: IconLayoutGrid },
      { TITLE: '里程碑', icon: IconMedal },
      { TITLE: '回顧', icon: IconPinned },
    ];

    const handleToggleTab = (tab: string) => {
      setSelectedTab(tab);
    };

    return (
      <section className='flex justify-center'>
        {tabs.map((tab) => {
          const { TITLE, icon } = tab;
          const IconComponent = icon;

          return (
            <div key={TITLE}>
              <div
                className={`h-[5px] w-full ${
                  selectedTab === TITLE &&
                  'bg-gradient-to-r from-[#7CCBFF] via-[#7CCBFF] to-[#0057FF]'
                }`}
              />
              <div className='flex w-[132px] items-center justify-center gap-x-1 py-8'>
                <IconComponent
                  size={16}
                  color={` ${selectedTab === TITLE ? '#000000' : '#808080'} `}
                />
                <button
                  className={`hover:cursor-pointer ${
                    selectedTab === TITLE ? 'font-bold' : 'text-note'
                  }`}
                  onClick={() => handleToggleTab(TITLE)}
                  type='button'
                >
                  {TITLE}
                </button>
              </div>
            </div>
          );
        })}
      </section>
    );
  });

  return (
    <section className='mb-4 flex w-full max-w-[1088px] flex-col items-center border-t'>
      <GalleryTabs />
      {renderGallery()}
    </section>
  );
}

export default ProfileGallery;
