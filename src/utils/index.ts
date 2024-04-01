//将身份转化为中文显示
export function parseRole(role: string | null) {
    if (role === 'MANAGER') {
        return "管理员"
    } else if (role === 'CUSTOMER') {
        return "顾客"
    } else if (role === 'STAFF') {
        return "商家"
    } else if (role === 'CEO') {
        return "CEO"
    }
}

//将时间转化为日常方式
export function parseTime(time: string) {
    let times = time.split(/T|\./)
    return times[0] + " " + times[1]
}

//将商品品类转化为中文显示
export function parseCategory(category: string) {
    if (category === 'FOOD') {
        return "食品"
    } else if (category === 'CLOTHES') {
        return "服饰"
    } else if (category === 'FURNITURE') {
        return "家具"
    } else if (category === 'ELECTRONICS') {
        return "电子产品"
    } else if (category === 'ENTERTAINMENT') {
        return "娱乐"
    } else if (category === 'SPORTS') {
        return "体育产品"
    } else if (category === 'LUXURY') {
        return "奢侈品"
    }
}

