import GitRepo from "../../test/utils/git_repo";
import AbstractDemo from "./abstract_demo";

export default class FullDemo extends AbstractDemo {
  constructor() {
    super(
      "full",
      [
        "# First, lets see our state of the world",
        "gp stacks",
        "# Now imagine we created our first stacked branch without graphite",
        'echo "new change" > ./server_change',
        "git checkout -b gf--server && git add . && git commit -m 'PROGRESS!'",
        "# Let's visualize our stacks",
        "gp stacks",
        "# If we forget to use graphite, we can regenerate our stacks retroactively",
        "git checkout main && gp stack regen",
        "gp stacks",
        "# Using graphite, we can create new stacked branches without `regen`",
        'git checkout gf--server && echo "second change" > ./api_change && git add .',
        "gp branch create 'gf--api' -m 'feat(api): improve it'",
        "# Let's visualize the extended stack",
        "gp stacks",
        "# What if our trunk branch moves forward one commit?",
        "git checkout main",
        "echo 'change' > ./main_change",
        "git add . && git commit -m 'OTHER'",
        "# Graphite recursively rebases depedent branches up the stack",
        "gp stack fix",
        "# Thanks for watching",
        "# Good luck and let us know if you have questions!",
        "sleep 5",
      ],
      (demoDir: string): void => {
        const repo = new GitRepo(demoDir);
        repo.createChangeAndCommit("First commit");
        repo.createChangeAndCommit("Second commit");
      }
    );
  }
}