import React from 'react';
import ToggleButtonList from './ToggleButtonList';

interface JobItem {
  id: number;
  short_name: string;
}

class JobToggleButtonList extends ToggleButtonList<JobItem, number> {
  itemToId(item: JobItem): number {
    return item.id;
  }

  renderLabel(job: JobItem): React.ReactNode {
    return `${job.short_name}`;
  }
};

export default JobToggleButtonList;

