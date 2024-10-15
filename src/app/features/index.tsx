'use client';

import { Course } from '@ek-types';
import { SideMenu } from './SideMenu';
// import { useDragAndDrop } from './DragAndDrop';
import { Navigation } from '@ek-components/Navigation';
// import { CourseList } from './CourseList/index';

// import { Accordion } from '@ek-components/Accordion';
// import { Button } from '@ek-components';

const course = {
  title: 'Course1',
};
interface Item {
  id: string;
  name: string;
  description: string;
}

export const Test = () => {
  // const DragAndDrop = useDragAndDrop<Item>();
  return (
    <>
      <Navigation />
    </>
  );
};
