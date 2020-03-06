export default function ({inheritedInstance}) {
	Object.entries(Object.getPrototypeOf(inheritedInstance)).forEach(([name, value]) => {
		if (typeof value === 'function') {
			inheritedInstance[name] = (...args) => {
				try {
					return value.call(inheritedInstance, ...args);
				} catch (error) {
					error.instance = inheritedInstance;
					throw error;
				}
			}
		}
	});
};