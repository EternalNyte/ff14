import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ToggleButtonListProps<T, IdType> {
  items: T[];
  selectedIds: IdType[];
  onToggle: (id: IdType) => Promise<void>;
}

class ToggleButtonList<T, IdType> extends React.Component<ToggleButtonListProps<T, IdType>> {
  itemToId(item: T): IdType {
    return item as unknown as IdType;
  }

  renderLabel(item: T): React.ReactNode {
    return String(item);
  }

  render() {
    const { items, onToggle, selectedIds } = this.props;

    return (
      <div className="btn-group" role="group">
        {items.map((item, index) => (
          <button
            key={String(this.itemToId(item))}
            onClick={() => onToggle(this.itemToId(item))}
            className={`btn btn-secondary ${selectedIds.includes(this.itemToId(item)) ? 'bg-primary' : 'bg-secondary'}`}
            style={{ marginRight: '5px', marginBottom: '5px' }}
          >
            {this.renderLabel(item)}
          </button>
        ))}
      </div>
    );
  }
};

export default ToggleButtonList;

