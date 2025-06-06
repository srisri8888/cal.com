 <Box p={2} maxWidth={500}>
      {logs.map((log, idx) => (
        <Box key={idx} mb={2}>
          <Typography fontWeight="bold">{log.type}</Typography>
          {log.details.map((d, i) => (
            <Typography key={i} variant="body2">
              {d}
            </Typography>
          ))}
          <Typography variant="caption" color="text.secondary">
            by {log.user} on {log.time}
          </Typography>
          <Divider sx={{ mt: 1 }} />
        </Box>
      ))}
    </Box>