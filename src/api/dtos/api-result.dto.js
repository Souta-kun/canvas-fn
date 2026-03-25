export const ok = (res, status, data) => res.status(status).json({ success: true, data });
export const fail = (res, status, error) => res.status(status).json({ success: false, error });
