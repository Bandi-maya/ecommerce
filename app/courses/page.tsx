'use client';
import React from 'react'
import HeroBanner from '../../components/shop/banner/HeroBanner'
import AchievementStats from '../../components/shop/microdegree/AchievementStats'
import CourseListSection from '../../components/shop/microdegree/CourseListSection'
import WhyChooseUsSection from '../../components/shop/microdegree/WhyChooseUsSection'
import ParentTestimonials from '../../components/shop/microdegree/ParentTestimonials'
import StudentSpotlights from '../../components/shop/microdegree/StudentSpotlights'
import FaqSection from '../../components/shop/microdegree/FaqSection'
import FilterSidebar from '@/components/shop/filters/FilterSidebar';
import AwardsCarousel from '@/components/shop/microdegree/AwardsCarousel';
import BenefitsSection from '@/components/shop/microdegree/BenefitsSection';
import CertificationsSection from '@/components/shop/microdegree/CertificationsSection';
import CourseCard from '@/components/shop/microdegree/CourseCard';

export default function Courses() {
  return (
    <div id="shop" className="microdegree-page">
      <FilterSidebar />
      
      {/* Main Content Area next to the sidebar */}
      <div> 
        <HeroBanner />
        <AchievementStats />
        <BenefitsSection />
        <CertificationsSection />
        {/* <CourseCard /> */}
        <CourseListSection />
        <WhyChooseUsSection />
        <ParentTestimonials />
        <StudentSpotlights />
        <AwardsCarousel />
        <FaqSection />
      </div>
    </div>
  );
}