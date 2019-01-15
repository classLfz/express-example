workflow "Build on push" {
  on = "push"
  resolves = ["lint"]
}

action "install dev" {
  uses = "actions/npm@e7aaefed7c9f2e83d493ff810f17fa5ccd7ed437"
  runs = "npm install"
}

action "global install" {
  uses = "actions/npm@e7aaefed7c9f2e83d493ff810f17fa5ccd7ed437"
  runs = "npm install --global gulp"
  needs = ["install dev"]
}

action "lint" {
  uses = "actions/npm@e7aaefed7c9f2e83d493ff810f17fa5ccd7ed437"
  needs = ["global install"]
  runs = "npm run lint"
}
