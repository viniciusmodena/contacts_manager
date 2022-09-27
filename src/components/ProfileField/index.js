function ProfileField({ editProfile, fieldName, fieldValue }) {
  return (
    <>
      {!editProfile ? (
        <Typography>
          {fieldName}: {fieldValue}
        </Typography>
      ) : (
        <TextField
          {...rest}
          autoFocus
          value={value}
          onChange={(event) => setName(event.target.value)}
        />
      )}
    </>
  );
}

export default ProfileField;
