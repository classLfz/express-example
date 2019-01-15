workflow "Build on push" {
  on = "push"
  resolves = ["lint"]
}

action "lint" {
  uses = "docker://node:10"
  runs = "npm install && npm run lint && npm run test"
}
