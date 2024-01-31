import React from 'react';
import ToggleButtonList from './ToggleButtonList';
import {JobData} from '../types/dataTypes';

class JobToggleButtonList extends ToggleButtonList<JobData, number> {
  itemToId(item: JobData): number {
    return item.id;
  }

  renderLabel(job: JobData): React.ReactNode {
    return `${job.short_name}`;
  }
};

export default JobToggleButtonList;

