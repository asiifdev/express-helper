import chalk from 'chalk';
import fs from 'fs-extra';
import ora from 'ora';

const redConsole = (msg1, msg2, msg3, msg4) => {
    return console.log(chalk.red(msg1, msg2, msg3, msg4))
}

const blueConsole = (msg1, msg2, msg3, msg4) => {
    return console.log(chalk.blue(msg1, msg2, msg3, msg4))
}

const greenConsole = (msg1, msg2, msg3, msg4) => {
    return console.log(chalk.green(msg1, msg2, msg3, msg4))
}

const copyFiles = async (from, to) => {
    try {
        if (from.includes('Controller')) {
            from = './node_modules/@asiifdev/express-helper/src/controllers/' + from
            to = './src/controllers/' + to
            spinners.warning("Proses pembuatan controller ", "Membuat Controller")
            await fs.copy('./node_modules/@asiifdev/express-helper/src/controllers/helperController.js', './src/controllers/helperController.js')
            fs.copy(from, to, async (err) => {
                if (err) return spinners.danger(err)
                else spinners.success("Proses pembuatan controller ", `Templating File from ${from} to ${to} Created`)
                // greenConsole(`\nTemplating File from ${from} to ${to} Created`)
            })
        }
        if (from.includes('Route')) {
            from = './node_modules/@asiifdev/express-helper/src/routes/' + from
            to = './src/routes/' + to
            spinners.warning("Proses pembuatan routing ", "Membuat Routing")
            fs.copy(from, to, (err) => {
                if (err) return spinners.danger(err)
                else spinners.success("Proses pembuatan router ", `Templating File from ${from} to ${to} Created`)
            })
        }
    } catch (err) {
        spinners.danger("Proses pembuatan controller", err)
    }
}

const spinners = {
    warning: async (msg, process, stop = true) => {
        const spinner = ora(msg).start();
        setTimeout(() => {
            spinner.color = 'yellow';
            spinner.text = process;
        }, 2000);
        if (stop) {
            setTimeout(() => {
                spinner.stop()
                console.log(chalk.yellow('💛 ', process))
            }, 5000)
        }
    },
    danger: (msg, process, stop = true) => {
        const spinner = ora(msg).start();
        setTimeout(() => {
            spinner.color = 'red';
            spinner.text = msg;
        }, 2000);
        if (stop) {
            setTimeout(() => {
                spinner.stop()
                console.log(chalk.red('╪ ', msg))
            }, 5000)
        }
    },
    success: (msg, process, stop = true) => {
        const spinner = ora(msg).start();
        setTimeout(() => {
            spinner.color = 'green';
            spinner.text = msg;
        }, 2000);
        if (stop) {
            setTimeout(() => {
                spinner.stop()
                console.log(chalk.green('💚 ', process))
            }, 5000)
        }
    },
    stop: () => {
        const spinner = ora(msg).start();
        spinner.stop()
    }
}

const firstLower = (lower) => {
    return lower && lower[0].toLowerCase() + lower.slice(1) || lower;
}

export {
    redConsole,
    blueConsole,
    greenConsole,
    copyFiles,
    spinners,
    firstLower
}

