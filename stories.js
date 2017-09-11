import React from "react";
import { storiesOf } from "@storybook/react";

import { Button, Welcome } from "@storybook/react/demo";

storiesOf("Welcome", module).add("to Story", () => <Welcome />);

storiesOf("Button", module).add("with text", () => (
  <Button>Helloarstarst</Button>
));
