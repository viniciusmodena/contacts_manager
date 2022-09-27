import { TextField, Typography } from "@mui/material";

function ProfileField({ editProfile, fieldName, fieldValue, register, error }) {
  return (
    <>
      {!editProfile ? (
        <Typography sx={{ px: 2 }}>
          {fieldName}: {fieldValue}
        </Typography>
      ) : (
        <TextField
          id={fieldName.toLowerCase()}
          name={fieldName.toLowerCase()}
          label={fieldName}
          required
          fullWidth
          autoFocus
          // register
          {...register(`${fieldName.toLowerCase()}`)}
          error={error}
          helperText={error?.message}
          defaultValue={fieldValue}
        />
      )}
    </>
  );
}

export default ProfileField;
