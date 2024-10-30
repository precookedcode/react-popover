# @precooked/react-popover

A simple and flexible React Popover component designed to work with any clickable element.

## Installation

Install the package using npm or yarn:

```bash
npm install @precooked/react-popover
```

or

```bash
yarn add @precooked/react-popover
```

## Usage

The `Popover` component can be attached to any clickable element by passing a reference (`ref`) to that element. It is fully customizable and can be used with buttons, icons, or any other component.

### Example

```tsx
import React, { useState, useRef } from "react";
import { Popover } from "@precooked/react-popover";

const App = () => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const togglePopover = () => {
    setPopoverOpen((prev) => !prev);
  };

  const closePopover = () => {
    setPopoverOpen(false);
  };

  return (
    <div>
      <button ref={buttonRef} onClick={togglePopover}>
        Click me!
      </button>

      <Popover
        content={<div>This is the popover content!</div>}
        anchorRef={buttonRef}
        isOpen={isPopoverOpen}
        onClose={closePopover}
      />
    </div>
  );
};

export default App;
```

### Props

- **`content`** (`React.ReactNode`): The content to display inside the popover.
- **`anchorRef`** (`React.RefObject<HTMLElement>`): A reference to the clickable element that triggers the popover.
- **`isOpen`** (`boolean`): Controls whether the popover is visible or not.
- **`onClose`** (`() => void`): Callback to close the popover when needed.

### Styling

You can customize the popover's appearance by overriding the inline styles or using CSS classes for advanced styling.

### License

MIT
