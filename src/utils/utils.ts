

export const createOrderByClause = (field: {fieldName: string, displayName?: string, latitude?: number, longitude?: number }, order: string) => {
    let value;
      if (field.latitude && field.longitude) {
        value = `geo.distance(${field.fieldName}, geography'POINT(${field.longitude} ${field.latitude})')`;
      }
      else {
        value = field.fieldName ? `${field.fieldName} ${order}` : "";
      }
    return value;
};