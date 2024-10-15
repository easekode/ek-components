'use client';
import {
  Button,
  EkCalendar,
  Modal,
  TextField,
  TextFieldWithIcon,
} from '@ek-components';

import { Test } from './features/index';
import { ModalContextProvider } from '@ek-components/Modal/ModalContext';
// import ShareModal from './features/ShareModal/index';
import React, { useState } from 'react';
import AddUserDetails, {
  UserDetails,
} from '@/../ek-components/AddUserDetails/index';
// import CourseBatches from './features/teachers/CourseBatch/MyBatchesTable';
import {
  ScheduleEvent,
  ScheduleEventButton,
} from '@ek-components/ScheduleEvent';
import { SideMenu } from './teacher/sideMenu/index';
import { InviteUsers } from './features/InviteUsers/index';
// import { SideMenu } from './features/SideMenu/index';
import Ratings from './features/Ratings/index';
import { FeedbackForm } from './features/FeedbackForm/feedbackForm';
import {
  ICourseBatch,
  NewBatchAssnBodyType,
} from '@/../../ek-types/src/courseBatch';

export default function Home() {
  // const [showShareModal, setShowShareModal] = React.useState(false);
  /*  const [data, setData] = useState<NewBatchAssnBodyType | null>({
    batchId: batch?._id,
    emails: [],
  }); */
  return (
    <main>
      <FeedbackForm
        topics={[
          { topic: 'Engagement and Participation' },
          { topic: 'Communication' },
          { topic: 'Clarity of Instruction' },
        ]}
      />
      {/* <InviteUsers batch={batch} /> */}
      test
    </main>
  );
}
