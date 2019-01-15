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
  uses = "docker://node:10.14"
  runs = "npm run lint"
}

action "TEST" {
  needs = "LINT"
  uses = "docker://node:10.14"
  runs = "npm run test"
}
