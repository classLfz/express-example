workflow "Build on push" {
  on = "push"
  resolves = ["INSTALL", "LINT", "TEST"]
}

action "INSTALL" {
  uses = "docker://node:10:14"
  runs = "npm install"
}

action "LINT" {
  needs = "INSTALL"
  runs = "npm run lint"
}

action "TEST" {
  needs = "LINT"
  runs = "npm run test"
}
