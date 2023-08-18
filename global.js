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

const copyFiles = async (from, to, nameFile) => {
    try {
        if (from.includes('Controller')) {
            from = './node_modules/@asiifdev/express-helper/src/controllers/' + from
            to = './src/controllers/' + to
            spinners.warning("Proses pembuatan controller ", "Membuat Controller")
            await fs.copy('./node_modules/@asiifdev/express-helper/src/controllers/helperController.js', './src/controllers/helperController.js')
            fs.copy(from, to, async (err) => {
                if (err) return spinners.danger(err)
                else {
                    // spinners.success("Proses pembuatan controller ", `Templating File from ${from} to ${to} Created`)
                    fs.readFile(to, 'utf8', (err, data) => {
                        if (err) {
                            spinners.danger(err);
                            return;
                        }
                        else {
                            spinners.warning("Proses membaca controller ", "Membaca Controller")
                            data = data.replace(/Template/g, firstUpper(nameFile))
                            spinners.success("Proses membaca controller ", `Reading File to ${to} Finish`)
                            fs.writeFile(to, data, (err) => {
                                spinners.warning("Proses menulis controller ", "Menulis Controller")
                                if (err) {
                                    spinners.danger(err);
                                    return;
                                }
                                else {
                                    spinners.success("Proses menulis controller ", `Write to ${to} Finish`)
                                }
                            })
                        }
                    });
                }
            })
        }
        if (from.includes('Route')) {
            from = './node_modules/@asiifdev/express-helper/src/routes/' + from
            to = './src/routes/' + to
            spinners.warning("Proses pembuatan routing ", "Membuat Routing")
            fs.copy(from, to, (err) => {
                if (err) return spinners.danger(err)
                else {
                    // spinners.success("Proses pembuatan controller ", `Templating File from ${from} to ${to} Created`)
                    fs.readFile(to, 'utf8', (err, data) => {
                        if (err) {
                            spinners.danger(err);
                            return;
                        }
                        else {
                            spinners.warning("Proses membaca routing ", "Membaca routing")
                            data = data.replace(/Template/g, firstUpper(nameFile))
                            data = data.replace(firstUpper(nameFile) + 'Controller', firstLower(nameFile) + 'Controller')
                            spinners.success("Proses membaca routing ", `Reading File to ${to} Finish`)
                            fs.writeFile(to, data, (err) => {
                                spinners.warning("Proses menulis routing ", "Menulis routing")
                                if (err) {
                                    spinners.danger(err);
                                    return;
                                }
                                else {
                                    spinners.success("Proses menulis routing ", `Write to ${to} Finish`)
                                }
                            })
                        }
                    });
                }
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

const firstUpper = (upper) => {
    return upper && upper[0].toUpperCase() + upper.slice(1) || upper;
}

export {
    redConsole,
    blueConsole,
    greenConsole,
    copyFiles,
    spinners,
    firstLower,
    firstUpper
}

