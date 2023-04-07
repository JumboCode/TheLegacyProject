This is the components folder. To add a component, just add a new file in this
directory and export your component as the default from that file. Then, you can
use `import <component name> from @components/<filename>` Here is an example of
that:

```typescript
// components/button.tsx
const Button = () => {...};
export default Button;

// pages/my_page.tsx
import Button from "@components/button";
...
```

Alternatively, if you want to make a component where you split up your code into
multiple files, you can make a folder with the name of the component, and export
your component as the default from `index.ts`. Here is an example:

```typescript
// components/slider/logic.tsx
const Slider = () => {...};
export Slider;

// components/slider/index.ts
import { Slider } from "./logic.tsx";
export default Slider;

// pages/my_page.tsx
import Slider from "@components/slider";
...
```

Note that in the above example, that you are importing from
`@components/slider`, _not_ `@components/slider/index` (this is not a functional
difference in this example, but could cause issues in the future).
