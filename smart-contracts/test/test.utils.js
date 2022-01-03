
async function shouldThrow(promise) {
    try {
        await promise;
    } catch (err) {
        return;
    }
    assert(false, "Should throw exception")
}

module.exports = {
    shouldThrow
};