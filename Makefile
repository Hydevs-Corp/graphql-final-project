.PHONY: dev

dev:
	tmux new-session -d -s dev-session 'cd server && npm run dev' \; \
	split-window -h 'cd webapp && npm run dev' \; \
	split-window -v 'while ! nc -z localhost 4000; do sleep 1; done && cd webapp && nodemon' \; \
	attach
